import React, { ComponentClass, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useRouteMatch } from 'react-router'

import { Loader, Drawer } from '../design-system'
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

const api = new ApiClient()

const RecordAction: React.FC = () => {
  const [record, setRecord] = useState<RecordJSON>()
  const [loading, setLoading] = useState(false)
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

  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }
  if (!action && !loading) {
    return (<NoActionError resourceId={resourceId} actionName={actionName} />)
  }

  if (!record && !loading) {
    return (<NoRecordError resourceId={resourceId} recordId={recordId} />)
  }

  if (loading || !action) {
    return <Loader />
  }

  const ActionWrapper = (action.showInDrawer ? Drawer : Wrapper) as unknown as ComponentClass

  return (
    <ActionWrapper>
      {!action?.showInDrawer ? (
        <ActionHeader
          resource={resource}
          action={action}
          record={record}
        />
      ) : ''}
      <BaseActionComponent
        action={action as ActionJSON}
        resource={resource}
        record={record}
      />
    </ActionWrapper>
  )
}

export default RecordAction
