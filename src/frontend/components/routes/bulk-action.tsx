import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '@admin-bro/design-system'

import { RouteComponentProps, useRouteMatch, useLocation } from 'react-router'
import BaseAction from '../app/base-action-component'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import { ReduxState } from '../../store/store'
import ErrorMessageBox, { NoResourceError, NoActionError } from '../app/error-message'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { BulkActionParams } from '../../../backend/utils/view-helpers'
import ApiClient from '../../utils/api-client'
import { AddNoticeProps } from '../../store/with-notice'
import getBulkActionsFromRecords from '../app/records-table/utils/get-bulk-actions-from-records'
import ActionJSON from '../../../backend/decorators/action-json.interface'
import Wrapper from './utils/wrapper'
import { ActionHeader } from '../app'
import { useTranslation, useNotice } from '../../hooks'
import DrawerPortal from '../app/drawer-portal'

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type MatchParams = Pick<BulkActionParams, 'actionName' | 'resourceId'>
type Props = PropsFromState & RouteComponentProps<MatchParams> & AddNoticeProps

type State = {
  records?: Array<RecordJSON>;
  isLoading: boolean;
  tag?: string;
}

const api = new ApiClient()

const BulkAction: React.FC = () => {
  const resources = useSelector((state: ReduxState) => state.resources)
  const match = useRouteMatch<MatchParams>()
  const [records, setRecords] = useState<Array<RecordJSON>>([])
  const [loading, setLoading] = useState(false)
  const { translateMessage } = useTranslation()
  const addNotice = useNotice()
  const location = useLocation()

  const { resourceId, actionName } = match.params
  const resource = resources.find(r => r.id === resourceId)

  const fetchRecords = (): Promise<void> => {
    const recordIdsString = new URLSearchParams(location.search).get('recordIds')
    const recordIds = recordIdsString ? recordIdsString.split(',') : []
    setLoading(true)

    return api.bulkAction({
      resourceId, recordIds, actionName,
    }).then((response) => {
      setLoading(false)
      setRecords(response.data.records)
    }).catch((error) => {
      setLoading(false)
      addNotice({
        message: translateMessage('errorFetchingRecords', resourceId),
        type: 'error',
      })
      throw error
    })
  }

  useEffect(() => {
    fetchRecords()
  }, [match.params.resourceId, match.params.actionName])

  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }

  if (!records && !loading) {
    return (
      <ErrorMessageBox title="No records">
        <p>{translateMessage('noRecordsSelected', resourceId)}</p>
      </ErrorMessageBox>
    )
  }

  const action = getBulkActionsFromRecords(records || []).find(r => r.name === actionName)

  if (loading) {
    const actionFromResource = resource.actions.find(r => r.name === actionName)
    return actionFromResource?.showInDrawer ? (<DrawerPortal><Loader /></DrawerPortal>) : <Loader />
  }

  if (!action) {
    return (<NoActionError resourceId={resourceId} actionName={actionName} />)
  }

  if (action.showInDrawer) {
    return (
      <DrawerPortal width={action.containerWidth}>
        <BaseAction
          action={action as ActionJSON}
          resource={resource}
          records={records}
        />
      </DrawerPortal>
    )
  }

  return (
    <Wrapper width={action.containerWidth}>
      {!action?.showInDrawer ? (
        <ActionHeader
          resource={resource}
          action={action}
        />
      ) : ''}
      <BaseAction
        action={action as ActionJSON}
        resource={resource}
        records={records}
      />
    </Wrapper>
  )
}

export default BulkAction
