import React from 'react'
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { AxiosResponse } from 'axios'
import { useLocation, useHistory } from 'react-router'

import { ActionResponse } from '../../../backend/actions/action.interface'

import { ActionJSON, buildActionCallApiTrigger, buildActionClickHandler } from '../../interfaces'

import { DifferentActionParams, ActionCallCallback, UseActionResult } from './use-action.types'
import { actionHref } from '../../interfaces/action/action-href'
import { callActionApi } from '../../interfaces/action/call-action-api'
import { useActionResponseHandler } from './use-action-response-handler'

/**
 * @load ./use-action.doc.md
 * @subcategory Hooks
 *
 * @param {ActionJSON}   action      action object
 * @param {ActionParams} params
 * @param {ActionCallCallback} onActionCall - callback triggered when action is performed
 * @return {UseActionResult}
 * @new In version 3.3
 * @class
 * @hideconstructor
 */
export function useAction<K extends ActionResponse>(
  action: ActionJSON,
  params: DifferentActionParams,
  onActionCall?: ActionCallCallback,
): UseActionResult<K> {
  const location = useLocation()
  const history = useHistory()

  const actionResponseHandler = useActionResponseHandler(onActionCall)

  const href = actionHref(action, params, location.search)

  const callApi = buildActionCallApiTrigger<K>({
    action,
    params,
    actionResponseHandler,
    search: location.search,
  })

  const handleClick = buildActionClickHandler({
    action,
    params,
    actionResponseHandler,
    search: location.search,
    push: history.push,
  })

  return {
    href,
    callApi,
    handleClick,
  }
}
