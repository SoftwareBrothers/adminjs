import { AxiosResponse } from 'axios'
import { useLocation, useHistory } from 'react-router'
import { useMemo } from 'react'

import { appendForceRefresh } from '../../../lib/frontend/components/actions/utils/append-force-refresh'
import ApiClient from '../../../lib/frontend/utils/api-client'

import { ActionResponse } from '../../backend/actions/action.interface'
import ViewHelpers, { ActionParams } from '../../backend/utils/view-helpers'
import ActionJSON from '../../backend/decorators/action-json.interface'

import useNotice from './use-notice'

export type ActionCallCallback = (action: ActionResponse) => any
export type UseActionResultCallApi<K extends ActionResponse> = () => Promise<AxiosResponse<K>>

export type UseActionResult<K extends ActionResponse> = {
  href: string;
  callApi: UseActionResultCallApi<K>;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const h = new ViewHelpers()

export function useAction<T extends ActionParams, K extends ActionResponse>(
  action: ActionJSON,
  params: T,
  onActionCall?: ActionCallCallback,
): UseActionResult<K> {
  const location = useLocation()
  const history = useHistory()
  const addNotice = useNotice()

  const { name: actionName, actionType } = action

  const {
    resourceId, recordId, recordIds,
  } = params

  const href: string = useMemo(() => {
    switch (actionType) {
    case 'record':
      if (!recordId) {
        throw new Error('You have to specify "recordId" for record action')
      }
      return h.recordActionUrl({ resourceId, recordId, actionName, search: location.search })
    case 'resource':
      return h.resourceActionUrl({ resourceId, actionName, search: location.search })
    case 'bulk':
      return h.bulkActionUrl({ resourceId, recordIds, actionName, search: location.search })
    default:
      throw new Error('"actionType" should be either record, resource or bulk')
    }
  }, [resourceId, recordId, actionName, location.search])

  const callApi = (): Promise<AxiosResponse<K>> => {
    const api = new ApiClient()
    let promise: Promise<AxiosResponse<K>>

    switch (action.actionType) {
    case 'record':
      if (!recordId) {
        throw new Error('You have to specify "recordId" for record action')
      }
      promise = api.recordAction({
        resourceId, actionName: action.name, recordId,
      })
      break
    case 'resource':
      promise = api.resourceAction({
        resourceId, actionName: action.name,
      })
      break
    case 'bulk':
      if (!recordIds) {
        throw new Error('You have to specify "recordIds" for bulk action')
      }
      promise = api.bulkAction({
        resourceId, actionName: action.name, recordIds,
      })
      break
    default:
      throw new Error('"actionType" should be either record, resource or bulk')
    }

    promise.then((response) => {
      const { data } = response
      if (data.notice) {
        addNotice(data.notice)
      }
      if (data.redirectUrl && location.pathname !== data.redirectUrl) {
        history.push(appendForceRefresh(data.redirectUrl))
      }
      if (onActionCall) {
        onActionCall(data)
      }
    }).catch((error) => {
      throw error
    })
    return promise
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault()
    if (action.guard && !confirm(action.guard)) {
      return
    }
    if (typeof action.component !== 'undefined' && action.component === false) {
      callApi()
    }
    history.push(href)
  }

  return {
    href,
    callApi,
    handleClick,
  }
}
