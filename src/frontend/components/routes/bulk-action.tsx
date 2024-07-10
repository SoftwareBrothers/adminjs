import React, { useState, useEffect } from 'react'
import { Loader } from '@adminjs/design-system'
import { useLocation, useParams } from 'react-router'

import { BulkActionParams } from '../../../backend/utils/view-helpers/view-helpers.js'
import ApiClient from '../../utils/api-client.js'
import getBulkActionsFromRecords from '../app/records-table/utils/get-bulk-actions-from-records.js'
import { ActionJSON, RecordJSON } from '../../interfaces/index.js'
import Wrapper from './utils/wrapper.js'
import {
  ActionHeader,
  DrawerPortal,
  BaseActionComponent,
  ErrorMessageBox,
  NoResourceError,
  NoActionError,
} from '../app/index.js'
import { useTranslation, useNotice, useResource } from '../../hooks/index.js'
import allowOverride from '../../hoc/allow-override.js'
import { getDataCss } from '../../index.js'

type MatchParams = Pick<BulkActionParams, 'actionName' | 'resourceId'>

const api = new ApiClient()

const BulkAction: React.FC = () => {
  const params = useParams<MatchParams>()
  const [records, setRecords] = useState<Array<RecordJSON>>([])
  const [loading, setLoading] = useState(false)
  const [tag, setTag] = useState('')
  const [filterVisible, setFilterVisible] = useState(false)
  const { translateMessage } = useTranslation()
  const addNotice = useNotice()
  const location = useLocation()

  const { resourceId, actionName } = params

  const resource = useResource(resourceId!)
  const listActionName = 'list'
  const listAction = resource?.resourceActions.find((r) => r.name === listActionName)

  const fetchRecords = (): Promise<void> => {
    const recordIdsString = new URLSearchParams(location.search).get('recordIds')
    const recordIds = recordIdsString ? recordIdsString.split(',') : []
    setLoading(true)

    return api
      .bulkAction({
        resourceId: resourceId!,
        recordIds,
        actionName: actionName!,
      })
      .then((response) => {
        setLoading(false)
        setRecords(response.data.records)
      })
      .catch((error) => {
        setLoading(false)
        addNotice({
          message: 'errorFetchingRecords',
          type: 'error',
          resourceId,
        })
        throw error
      })
  }

  useEffect(() => {
    fetchRecords()
  }, [params.resourceId, params.actionName, location.search])

  if (!resource) {
    return <NoResourceError resourceId={resourceId!} />
  }

  if (!records && !loading) {
    return (
      <ErrorMessageBox title="No records">
        <p>{translateMessage('noRecordsSelected', resourceId)}</p>
      </ErrorMessageBox>
    )
  }

  const action = getBulkActionsFromRecords(records || []).find((r) => r.name === actionName)

  if (loading) {
    const actionFromResource = resource.actions.find((r) => r.name === actionName)
    return actionFromResource?.showInDrawer ? (
      <DrawerPortal>
        <Loader />
      </DrawerPortal>
    ) : (
      <Loader />
    )
  }

  if (!action) {
    return <NoActionError resourceId={resourceId!} actionName={actionName!} />
  }

  const routeWrapperCss = getDataCss(resource.id, action.actionType, action.name, 'route-wrapper')
  const routeActionCss = getDataCss(resource.id, action.actionType, action.name, 'route')

  if (action.showInDrawer) {
    if (!listAction) {
      return (
        <DrawerPortal width={action.containerWidth} data-css={routeActionCss}>
          <BaseActionComponent
            action={action as ActionJSON}
            resource={resource}
            records={records}
          />
        </DrawerPortal>
      )
    }

    const toggleFilter = listAction.showFilter
      ? (): void => setFilterVisible(!filterVisible)
      : undefined

    return (
      <>
        <DrawerPortal width={action.containerWidth} data-css={routeActionCss}>
          <BaseActionComponent
            action={action as ActionJSON}
            resource={resource}
            records={records}
            setTag={setTag}
          />
        </DrawerPortal>
        <Wrapper width={listAction.containerWidth} data-css={routeWrapperCss}>
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
    <Wrapper width={action.containerWidth} data-css={routeWrapperCss}>
      {!action?.showInDrawer ? <ActionHeader resource={resource} action={action} tag={tag} /> : ''}
      <BaseActionComponent
        action={action as ActionJSON}
        resource={resource}
        records={records}
        setTag={setTag}
      />
    </Wrapper>
  )
}

export default allowOverride(BulkAction, 'BulkActionRoute')
