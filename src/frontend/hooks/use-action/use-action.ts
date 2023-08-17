import { useNavigate, useLocation } from 'react-router'

import { ActionResponse } from '../../../backend/actions/action.interface.js'
import { ActionJSON, buildActionCallApiTrigger, buildActionClickHandler } from '../../interfaces/index.js'
import { DifferentActionParams, ActionCallCallback, UseActionResult } from './use-action.types.js'
import { actionHref } from '../../interfaces/action/action-href.js'
import { useActionResponseHandler } from './use-action-response-handler.js'
import { useTranslation } from '../use-translation.js'
import { useModal } from '../use-modal.js'

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
  const location = useLocation()
  const translateFunctions = useTranslation()
  const modalFunctions = useModal()
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
    translateFunctions,
    modalFunctions,
    location,
  })

  return {
    href,
    callApi,
    handleClick,
  }
}
