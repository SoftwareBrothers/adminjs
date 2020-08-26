import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { useRouteMatch } from 'react-router'
import { Loader } from '@admin-bro/design-system'

import BaseActionComponent from '../app/base-action-component'
import ApiClient from '../../utils/api-client'
import { RecordActionParams } from '../../../backend/utils/view-helpers'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import ActionJSON from '../../../backend/decorators/action-json.interface'
import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError, NoRecordError } from '../app/error-message'
import Wrapper from './utils/wrapper'
import { ActionHeader } from '../app'
import { useNotice, useTranslation } from '../../hooks'
import DrawerPortal from '../app/drawer-portal'
import { ActionResponse, RecordActionResponse } from '../../../backend/actions/action.interface'
import mergeRecordResponse from '../../hooks/use-record/merge-record-response'

const api = new ApiClient()

const RecordAction: React.FC = () => {
  const [record, setRecord] = useState<RecordJSON>()
  const [loading, setLoading] = useState(true)
  const match = useRouteMatch<RecordActionParams>()
  const resources = useSelector((state: ReduxState) => state.resources)
  const addNotice = useNotice()
  const { translateMessage } = useTranslation()

  const { actionName, recordId, resourceId } = match.params
  const resource = resources.find(r => r.id === resourceId)

  const action = record && record.recordActions.find(r => r.name === actionName)

  const fetchRecord = (): void => {
    setLoading(true)
    api.recordAction(match.params).then((response) => {
      setLoading(false)
      setRecord(response.data.record)
    }).catch((error) => {
      addNotice({
        message: translateMessage('errorFetchingRecord', resourceId),
        type: 'error',
      })
      throw error
    })
  }

  useEffect(() => {
    fetchRecord()
  }, [actionName, recordId, resourceId])

  const handleActionPerformed = useCallback((oldRecord: RecordJSON, response: ActionResponse) => {
    if (response.record) {
      setRecord(mergeRecordResponse(oldRecord, response as RecordActionResponse))
    } else {
      fetchRecord()
    }
  }, [fetchRecord])

  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }

  if (loading) {
    const actionFromResource = resource.actions.find(r => r.name === actionName)
    return actionFromResource?.showInDrawer ? (<DrawerPortal><Loader /></DrawerPortal>) : <Loader />
  }

  if (!action) {
    return (<NoActionError resourceId={resourceId} actionName={actionName} />)
  }

  if (!record) {
    return (<NoRecordError resourceId={resourceId} recordId={recordId} />)
  }

  if (action.showInDrawer) {
    return (
      <DrawerPortal width={action.containerWidth}>
        <BaseActionComponent
          action={action as ActionJSON}
          resource={resource}
          record={record}
        />
      </DrawerPortal>
    )
  }

  return (
    <Wrapper width={action.containerWidth}>
      <ActionHeader
        resource={resource}
        action={action}
        record={record}
        actionPerformed={(response: ActionResponse): void => (
          handleActionPerformed(record, response)
        )}
      />
      <BaseActionComponent
        action={action}
        resource={resource}
        record={record}
      />
    </Wrapper>
  )
}

export default RecordAction
