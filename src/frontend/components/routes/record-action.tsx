import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import { Loader } from '@adminjs/design-system'

import { ErrorTypeEnum } from '../../../utils/error-type.enum.js'
import BaseActionComponent from '../app/base-action-component.js'
import ApiClient from '../../utils/api-client.js'
import { RecordActionParams } from '../../../backend/utils/view-helpers/view-helpers.js'
import { ActionJSON, RecordJSON, actionHasDisabledComponent } from '../../interfaces/index.js'
import { NoResourceError, NoActionError, NoRecordError } from '../app/error-message.js'
import Wrapper from './utils/wrapper.js'
import { ActionHeader } from '../app/index.js'
import { useNotice, useResource } from '../../hooks/index.js'
import DrawerPortal from '../app/drawer-portal.js'
import { ActionResponse, RecordActionResponse } from '../../../backend/actions/action.interface.js'
import mergeRecordResponse from '../../hooks/use-record/merge-record-response.js'
import allowOverride from '../../hoc/allow-override.js'

const api = new ApiClient()

const RecordAction: React.FC = () => {
  const [record, setRecord] = useState<RecordJSON>()
  const [loading, setLoading] = useState(true)
  const [tag, setTag] = useState('')
  const [filterVisible, setFilterVisible] = useState(false)
  const params = useParams<RecordActionParams>()
  const addNotice = useNotice()

  const { actionName, recordId, resourceId } = params
  const resource = useResource(resourceId!)

  const action = record && record.recordActions.find((r) => r.name === actionName)
  const actionFromResource = resource?.actions.find((a) => a.name === actionName)

  const listActionName = 'list'
  const listAction = resource?.resourceActions.find((r) => r.name === listActionName)

  const fetchRecord = (): void => {
    // Do not call API on route enter if the action doesn't have a component
    if (actionFromResource && actionHasDisabledComponent(actionFromResource)) {
      setLoading(false)
      return
    }

    setLoading(true)
    api
      .recordAction(params as RecordActionParams)
      .then((response) => {
        if (response.data.notice && response.data.notice.type === 'error') {
          addNotice(response.data.notice)
        }
        if (
          !response.data.record?.baseError?.type
          || ![ErrorTypeEnum.App, ErrorTypeEnum.NotFound, ErrorTypeEnum.Forbidden].includes(
            response.data.record?.baseError?.type as ErrorTypeEnum,
          )
        ) {
          setRecord(response.data.record)
        }
      })
      .catch((error) => {
        addNotice({
          message: 'errorFetchingRecord',
          type: 'error',
          resourceId,
        })
        throw error
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchRecord()
  }, [actionName, recordId, resourceId])

  const handleActionPerformed = useCallback(
    (oldRecord: RecordJSON, response: ActionResponse) => {
      if (response.record) {
        setRecord(mergeRecordResponse(oldRecord, response as RecordActionResponse))
      } else {
        fetchRecord()
      }
    },
    [fetchRecord],
  )

  if (!resource) {
    return <NoResourceError resourceId={resourceId!} />
  }

  // When the user visits this route (record action) from a different, than the current one, record.
  // It renders everything with a new resource. The old record remains until useEffect fetches data
  // from the API. that is why we have to check if the current record has correct record.id.
  // Alternative approach would be to setRecord(undefined) before the fetch, but it is async and
  // we cannot be sure that the component wont be rendered (it will be at least once) with the
  // wrong data.
  const hasDifferentRecord = record && record.id && record.id.toString() !== recordId

  if (loading || hasDifferentRecord) {
    return actionFromResource?.showInDrawer ? (
      <DrawerPortal>
        <Loader />
      </DrawerPortal>
    ) : (
      <Loader />
    )
  }

  if (!action || (actionFromResource && actionHasDisabledComponent(actionFromResource))) {
    return <NoActionError resourceId={resourceId!} actionName={actionName!} />
  }

  if (!record) {
    return <NoRecordError resourceId={resourceId!} recordId={recordId!} />
  }

  if (action.showInDrawer) {
    if (!listAction) {
      return (
        <DrawerPortal width={action.containerWidth}>
          <BaseActionComponent action={action as ActionJSON} resource={resource} record={record} />
        </DrawerPortal>
      )
    }

    const toggleFilter = listAction.showFilter
      ? (): void => setFilterVisible(!filterVisible)
      : undefined

    return (
      <>
        <DrawerPortal width={action.containerWidth}>
          <BaseActionComponent action={action as ActionJSON} resource={resource} record={record} />
        </DrawerPortal>
        <Wrapper width={listAction.containerWidth}>
          <ActionHeader
            resource={resource}
            action={listAction}
            tag={tag}
            toggleFilter={toggleFilter}
          />
          <BaseActionComponent action={listAction} resource={resource} setTag={setTag} />
        </Wrapper>
      </>
    )
  }

  return (
    <Wrapper width={action.containerWidth}>
      <ActionHeader
        resource={resource}
        action={action}
        record={record}
        actionPerformed={(response: ActionResponse):void => handleActionPerformed(record, response)}
      />
      <BaseActionComponent action={action} resource={resource} record={record} />
    </Wrapper>
  )
}

export default allowOverride(RecordAction, 'RecordActionRoute')
