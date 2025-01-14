/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { NavigateFunction, Location } from 'react-router'

import { DifferentActionParams, useActionResponseHandler } from '../../hooks/index.js'
import { actionHasDisabledComponent } from './action-has-component.js'
import { actionHref } from './action-href.js'
import { ActionJSON } from './action-json.interface.js'
import { buildActionCallApiTrigger } from './build-action-api-call-trigger.js'
import { TranslateFunctions } from '../../../utils/index.js'
import { ModalData, ModalFunctions } from '../modal.interface.js'
import { REFRESH_KEY } from '../../components/actions/utils/append-force-refresh.js'

export type BuildActionClickOptions = {
  action: ActionJSON
  params: DifferentActionParams
  actionResponseHandler: ReturnType<typeof useActionResponseHandler>
  navigate: NavigateFunction
  translateFunctions: TranslateFunctions
  modalFunctions: ModalFunctions
  location?: Location
}

export type BuildActionClickReturn = (event: any) => any | Promise<any>

export const buildActionClickHandler = (
  options: BuildActionClickOptions,
): BuildActionClickReturn => {
  const { action, params, actionResponseHandler, navigate, modalFunctions, location } = options
  const { openModal } = modalFunctions

  const handleActionClick = (event: React.MouseEvent<HTMLElement>): Promise<any> | any => {
    event.preventDefault()
    event.stopPropagation()

    const href = actionHref(action, params)

    const callApi = buildActionCallApiTrigger({
      params,
      action,
      actionResponseHandler,
    })

    // Action has "component" option set to "false" explicitly in it's configuration
    if (actionHasDisabledComponent(action)) {
      if (action.guard) {
        const modalData: ModalData = {
          modalProps: {
            variant: 'danger',
            label: 'confirm',
            title: action.guard,
            subTitle: '',
          },
          type: 'confirm',
          resourceId: params.resourceId,
          confirmAction: callApi,
        }

        // If confirmation is required, action trigger should be handled in modal
        openModal(modalData)
        return
      }

      // If no confirmation is required, call API
      callApi()
      return
    }

    // Default behaviour - you're navigated to action URL and logic is performed on it's route
    if (href) {
      const url = new URL(`relative:${href}`)
      const hrefParams = new URLSearchParams(url.search)
      const currentParams = new URLSearchParams(action.showInDrawer ? location?.search ?? '' : '')
      Object.entries(Object.fromEntries(currentParams.entries())).forEach(([key, value]) => {
        if (!hrefParams.has(key)) hrefParams.set(key, value)
      })

      if (location?.pathname === url.pathname) {
        hrefParams.set(REFRESH_KEY, 'true')
      }

      navigate({
        pathname: url.pathname,
        search: hrefParams.toString(),
      })
    }
  }

  return handleActionClick
}
