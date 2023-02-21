/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useNavigate, useLocation } from 'react-router'

import { ActionResponse } from '../../../backend/actions/action.interface.js'
import { appendForceRefresh } from '../../components/actions/utils/append-force-refresh.js'
import { ActionCallCallback } from './index.js'
import { useNotice } from '../use-notice.js'

export const useActionResponseHandler = (onActionCall?: ActionCallCallback) => {
  const location = useLocation()
  const navigate = useNavigate()
  const addNotice = useNotice()

  return (response: ActionResponse) => {
    const { data } = response
    if (data.notice) {
      addNotice(data.notice)
    }
    if (data.redirectUrl && location.pathname !== data.redirectUrl) {
      const appended = appendForceRefresh(data.redirectUrl)
      navigate(appended)
    }
    if (onActionCall) {
      onActionCall(data)
    }
  }
}
