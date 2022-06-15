/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useHistory, useLocation } from 'react-router'
import { ActionResponse } from '../../../backend/actions/action.interface'
import { appendForceRefresh } from '../../components/actions/utils/append-force-refresh'
import { ActionCallCallback } from '.'
import { useNotice } from '../use-notice'


export const useActionResponseHandler = (onActionCall?: ActionCallCallback) => {
  const location = useLocation()
  const history = useHistory()
  const addNotice = useNotice()

  return (response: ActionResponse) => {
    const { data } = response
    if (data.notice) {
      addNotice(data.notice)
    }
    if (data.redirectUrl && location.pathname !== data.redirectUrl) {
      const appended = appendForceRefresh(data.redirectUrl)
      history.push(appended)
    }
    if (onActionCall) {
      onActionCall(data)
    }
  }
}
