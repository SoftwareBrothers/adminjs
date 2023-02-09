import mergeWith from 'lodash/mergeWith'

import { RelationOptions, ResourceDecorator } from '..'
import AdminJS from '../../../../adminjs'

import { BaseResource } from '../../../adapters'

export type DecoratedRelations = {
  [key: string]: RelationOptions;
}

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
export function decorateRelations(
  resource: BaseResource,
  admin: AdminJS,
  decorator: ResourceDecorator,
): DecoratedRelations {
  const { options } = decorator
  // in the end we merge actions defined by the user with the default actions.
  // since _.merge is a deep merge it also overrides defaults with the parameters
  // specified by the user.
  const relations = mergeWith({}, options.relations || {}, mergeCustomizer)

  return Object.entries(relations)
    .reduce((memo: DecoratedRelations, [name, info]) => ({
      ...memo,
      [name]: {
        relationName: name,
        relationType: info.relationType,
        target: info.target,
        junction: info.junction,
      },
    }), {})
}
