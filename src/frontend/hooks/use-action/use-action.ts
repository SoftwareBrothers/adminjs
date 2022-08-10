import { useNavigate } from 'react-router'

import { ActionResponse } from '../../../backend/actions/action.interface'
import { ActionJSON, buildActionCallApiTrigger, buildActionClickHandler } from '../../interfaces'
import { DifferentActionParams, ActionCallCallback, UseActionResult } from './use-action.types'
import { actionHref } from '../../interfaces/action/action-href'
import { useActionResponseHandler } from './use-action-response-handler'

/**
 * @load ./use-action.doc.md
 * @subcategory Hooks
 *
 * @param {ActionJSON}   action      action object
 * @param {ActionParams} params
 * @param {ActionCallCallback} onActionCall - callback triggered when action is performed
 * @return {UseActionResult}
 * @class
 * @hideconstructor
 */
export function useAction<K extends ActionResponse>(
  action: ActionJSON,
  params: DifferentActionParams,
  onActionCall?: ActionCallCallback,
): UseActionResult<K> {
  const navigate = useNavigate()

  const actionResponseHandler = useActionResponseHandler(onActionCall)

  const href = actionHref(action, params)

  const callApi = buildActionCallApiTrigger<K>({
    action,
    params,
    actionResponseHandler,
  })

  const handleClick = buildActionClickHandler({
    action,
    params,
    actionResponseHandler,
    navigate,
  })

  return {
    href,
    callApi,
    handleClick,
  }
}
