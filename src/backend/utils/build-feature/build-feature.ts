/* eslint-disable no-nested-ternary */
import uniq from 'lodash/uniq'
import merge from 'lodash/merge'
import { FeatureType } from '../../../admin-bro-options.interface'
import { ResourceOptions } from '../../decorators/resource/resource-options.interface'
import { Action, ActionResponse } from '../../actions/action.interface'

function mergeActionHooks<T>(
  key: string,
  oldHook?: T | Array<T> | null,
  newHook?: T | Array<T> | null,
): Record<string, Array<T>> | {} {
  let hooks: Array<T> = []
  if (oldHook) {
    if (Array.isArray(oldHook)) {
      hooks = [...hooks, ...oldHook]
    } else if (oldHook) {
      hooks = [...hooks, oldHook]
    }
  }
  if (newHook) {
    if (Array.isArray(newHook)) {
      hooks = [...hooks, ...newHook]
    } else if (newHook) {
      hooks = [...hooks, newHook]
    }
  }
  return hooks.length ? { [key]: hooks } : {}
}

const basicOptions = ['id', 'href', 'parent', 'sort', 'navigation'] as const
const listOptions = [
  'listProperties', 'showProperties', 'editProperties', 'filterProperties',
] as const

type BasicOption = typeof basicOptions[number]
type ListOption = typeof listOptions[number]

type MissingKeys = Required<Omit<ResourceOptions, BasicOption | ListOption | 'actions' | 'properties'>>

// The following check is done in typescript to ensure that the `basicOptions` and `listOptions`
// contains all the keys from ResourceOptions (+ actions and properties) which are copied
// separately. If type MissingKeys has any key following condition is not meet and typescript
// throws an error.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasMissingKeys: MissingKeys = {} as const

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
  const options = { ...oldOptions }

  basicOptions.forEach((propName: string) => {
    if (newOptions[propName]) {
      options[propName] = newOptions[propName]
    }
  })

  listOptions.forEach((propName: string) => {
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
