import mergeWith from 'lodash/mergeWith.js'

import ResourceDecorator from '../resource-decorator.js'
import AdminJS from '../../../../adminjs.js'
import { Action, ActionResponse, ACTIONS } from '../../../actions/index.js'
import { BaseResource } from '../../../adapters/index.js'
import { ActionDecorator } from '../../action/index.js'

export type DecoratedActions = {[key: string]: ActionDecorator}

function mergeCustomizer<T>(destValue: T | Array<T>, sourceValue: T | Array<T>): void {
  if (Array.isArray(destValue)) {
    destValue.concat(sourceValue)
  }
}

/**
 * Used to create an {@link ActionDecorator} based on both
 * {@link AdminJS.ACTIONS default actions} and actions specified by the user
 * via {@link AdminJSOptions}
 *
 * @returns {Record<string, ActionDecorator>}
 * @private
 */
export function decorateActions(
  resource: BaseResource,
  admin: AdminJS,
  decorator: ResourceDecorator,
): DecoratedActions {
  const { options } = decorator
  // in the end we merge actions defined by the user with the default actions.
  // since _.merge is a deep merge it also overrides defaults with the parameters
  // specified by the user.
  const actions = mergeWith({}, ACTIONS, options.actions || {}, mergeCustomizer)
  const returnActions = {}
  // setting default values for actions
  Object.keys(actions).forEach((key: string) => {
    const action: Action<ActionResponse> = {
      name: actions[key].name || key,
      label: actions[key].label || key,
      actionType: actions[key].actionType || ['resource'],
      ...actions[key],
    }

    returnActions[key] = new ActionDecorator({
      action,
      admin,
      resource,
    })
  })

  return returnActions
}
