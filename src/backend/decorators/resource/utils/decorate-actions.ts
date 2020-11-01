import merge from 'lodash/merge'
import { ResourceDecorator } from '..'
import AdminBro from '../../../../admin-bro'
import { Action, ActionResponse, ACTIONS } from '../../../actions'

import { BaseResource } from '../../../adapters'
import { ActionDecorator } from '../../action'

export type DecoratedActions = {[key: string]: ActionDecorator}

/**
 * Used to create an {@link ActionDecorator} based on both
 * {@link AdminBro.ACTIONS default actions} and actions specified by the user
 * via {@link AdminBroOptions}
 *
 * @returns {Record<string, ActionDecorator>}
 * @private
 */
export function decorateActions(
  resource: BaseResource,
  admin: AdminBro,
  decorator: ResourceDecorator,
): DecoratedActions {
  const { options } = decorator
  // in the end we merge actions defined by the user with the default actions.
  // since _.merge is a deep merge it also overrides defaults with the parameters
  // specified by the user.
  const actions = merge({}, ACTIONS, options.actions || {})
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
