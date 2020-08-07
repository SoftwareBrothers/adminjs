/* eslint-disable no-nested-ternary */
import uniq from 'lodash/uniq'
import merge from 'lodash/merge'
import { FeatureType } from '../../admin-bro-options.interface'
import { ResourceOptions } from '../decorators/resource-options.interface'
import Action, { ActionResponse } from '../actions/action.interface'

function mergeActionHooks<T>(
  key: string,
  oldHook?: T | Array<T>,
  newHook?: T | Array<T>,
): Record<string, Array<T>> | {} {
  let hooks: Array<T> = []
  if (oldHook) {
    if (Array.isArray(oldHook)) {
      hooks = [...hooks, ...oldHook]
    } else {
      hooks = [...hooks, oldHook]
    }
  }
  if (newHook) {
    if (Array.isArray(newHook)) {
      hooks = [...hooks, ...newHook]
    } else {
      hooks = [...hooks, newHook]
    }
  }
  return hooks.length ? { [key]: hooks } : {}
}

/**
 * @name mergeResourceOptions
 * @function
 * @description
 * Merges 2 ResourceOptions together. Used by features
 *
 * - 'id', 'href', 'parent', 'sort' from `newOptions` override `oldOptions`
 * - 'listProperties', 'showProperties', 'editProperties', 'filterProperties'
 *   are joined and made unique
 * - all 'properties' from `newOptions` override properties from `oldOptions`
 * - all 'actions' with their parameters from `newOptions` override `oldOptions`
 *   except hooks and handler - which are chained.
 *
 * @param   {ResourceOptions}  oldOptions
 * @param   {ResourceOptions}  newOptions
 *
 * @return  {ResourceOptions}
 */
const mergeResourceOptions = (
  oldOptions: ResourceOptions = {},
  newOptions: ResourceOptions = {},
): ResourceOptions => {
  const options = { ...oldOptions };

  ['id', 'href', 'parent', 'sort'].forEach((propName) => {
    if (newOptions[propName]) {
      options[propName] = newOptions[propName]
    }
  });

  ['listProperties', 'showProperties', 'editProperties', 'filterProperties'].forEach((propName) => {
    if (newOptions[propName]) {
      const mergedOptions = [
        ...(oldOptions && oldOptions[propName] ? oldOptions[propName] : []),
        ...(newOptions && newOptions[propName] ? newOptions[propName] : []),
      ]

      options[propName] = uniq(mergedOptions)
    }
  })

  if (oldOptions.properties || newOptions.properties) {
    options.properties = merge({}, oldOptions.properties, newOptions.properties)
  }

  if (oldOptions.actions || newOptions.actions) {
    options.actions = Object.keys(newOptions.actions || {}).reduce((memo, actionName) => {
      const action = (newOptions.actions || {})[actionName] as Action<ActionResponse>
      const oldAction = memo[actionName] as Action<ActionResponse>
      return {
        ...memo,
        [actionName]: {
          ...memo[actionName],
          ...action,
          ...mergeActionHooks('before', oldAction?.before, action?.before),
          ...mergeActionHooks('after', oldAction?.after, action?.after),
          ...mergeActionHooks('handler', oldAction?.handler, action?.handler),
        },
      }
    }, oldOptions.actions || {})
  }

  return options
}

/**
 * @name buildFeature
 * @function
 * @description
 * Higher Order Function which creates a feature
 *
 * @param   {ResourceOptions}  options
 *
 * @return  {FeatureType}
 * @example
 * const { buildFeature } = require('admin-bro/@core')
 *
 * const feature = buildFeature({
 *   // resource options goes here.
 * })
 */
const buildFeature = (options: ResourceOptions = {}): FeatureType => (
  (prevOptions: ResourceOptions = {}): ResourceOptions => mergeResourceOptions(prevOptions, options)
)

export { mergeResourceOptions, buildFeature }
