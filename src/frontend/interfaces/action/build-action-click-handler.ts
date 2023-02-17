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
import { ConfirmModalData, ConfirmModalFunctions } from '../confirm-modal.interface'

export type BuildActionClickOptions = {
  action: ActionJSON;
  params: DifferentActionParams;
  actionResponseHandler: ReturnType<typeof useActionResponseHandler>;
  navigate: NavigateFunction;
  translateFunctions: TranslateFunctions;
  modalFunctions: ConfirmModalFunctions
}

export type BuildActionClickReturn = (event: any) => any | Promise<any>

export const buildActionClickHandler = (
  options: BuildActionClickOptions,
): BuildActionClickReturn => {
  const { action, params, actionResponseHandler, navigate,
    modalFunctions } = options
  const { openModal } = modalFunctions

  const handleActionClick = (event: React.MouseEvent<HTMLElement>): Promise<any> | any => {
    event.preventDefault()
    event.stopPropagation()

    const href = actionHref(action, params)

    const callApi = buildActionCallApiTrigger({
      params, action, actionResponseHandler,
    })

    if (action.guard && actionHasComponent(action)) {
      const modalData: ConfirmModalData = {
        modalProps: {
          label: 'confirm',
          title: action.guard,
        },
        type: 'confirm',
        resourceId: params.resourceId,
        confirmAction: callApi,
      }
      openModal(modalData)
      return
    }

    if (href) {
      navigate(href)
    }
  }

  return handleActionClick
}
