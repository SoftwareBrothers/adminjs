import { flatten } from 'flat'
import { DELIMITER } from './constants'
import { FlattenParams } from '../flat'
import { propertyKeyRegex } from './property-key-regex'
import { pathToParts } from './path-to-parts'

const isObject = (value: any): boolean => {
  // Node environment
  if (typeof File === 'undefined') {
    return typeof value === 'object' && value !== null
  }
  // Window environment
  return typeof value === 'object' && !(value instanceof File) && value !== null
}

/**
 * @load ./set.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string} propertyPath
 * @param {any} [value]       if not give function will only try to remove old keys
 * @returns {FlattenParams}
 */
const set = (params: FlattenParams = {}, propertyPath: string, value?: any): FlattenParams => {
  const regex = propertyKeyRegex(propertyPath)

  // remove all existing keys
  const paramsCopy = Object.keys(params)
    .filter(key => !key.match(regex))
    .reduce((memo, key) => {
      memo[key] = params[key]

      return memo
    }, {} as FlattenParams)

  if (typeof value !== 'undefined') {
    if (isObject(value) && !(value instanceof Date)) {
      const flattened = flatten(value) as any

      if (Object.keys(flattened).length) {
        Object.keys(flattened).forEach((key) => {
          paramsCopy[`${propertyPath}${DELIMITER}${key}`] = flattened[key]
        })
      } else if (Array.isArray(value)) {
        paramsCopy[propertyPath] = []
      } else {
        paramsCopy[propertyPath] = {}
      }
    } else {
      paramsCopy[propertyPath] = value
    }

    // when user gave { "nested.value": "something" } and had "nested" set to `null`, then
    // nested should be removed
    const parts = pathToParts(propertyPath).slice(0, -1)
    if (parts.length) {
      return Object.keys(paramsCopy)
        .filter(key => !parts.includes(key))
        .reduce((memo, key) => {
          memo[key] = paramsCopy[key]

          return memo
        }, {} as FlattenParams)
    }
  }
  return paramsCopy
}

export { set }
