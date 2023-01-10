/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { NavigateFunction } from 'react-router'
import { DifferentActionParams, useActionResponseHandler } from '../../hooks'
import { actionHasComponent } from './action-has-component'
import { actionHref } from './action-href'
import { ActionJSON } from './action-json.interface'
import { buildActionCallApiTrigger } from './build-action-api-call-trigger'
import { TranslateFunctions } from '../../../utils'

export type BuildActionClickOptions = {
  action: ActionJSON;
  params: DifferentActionParams;
  actionResponseHandler: ReturnType<typeof useActionResponseHandler>;
  navigate: NavigateFunction;
  translateFunctions: TranslateFunctions;
}

export type BuildActionClickReturn = (event: any) => any | Promise<any>

export const buildActionClickHandler = (
  options: BuildActionClickOptions,
): BuildActionClickReturn => {
  const { action, params, actionResponseHandler, navigate, translateFunctions } = options
  const { translateMessage } = translateFunctions

  const handleActionClick = (event: React.MouseEvent<HTMLElement>): Promise<any> | any => {
    event.preventDefault()
    event.stopPropagation()

    const href = actionHref(action, params)

    const callApi = buildActionCallApiTrigger({
      params, action, actionResponseHandler,
    })

    if (action.guard && !confirm(translateMessage(action.guard, params.resourceId))) {
      return
    }

    if (actionHasComponent(action)) {
      // eslint-disable-next-line consistent-return
      return callApi()
    }

    if (href) {
      navigate(href)
    }
  }

  return handleActionClick
}
