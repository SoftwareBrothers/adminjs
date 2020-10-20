import { unflatten } from 'flat'
import { DELIMITER } from './constants'
import { selectParams } from './select-params'
import { FlattenParams } from '../flat'
import { propertyKeyRegex } from './property-key-regex'

const TEMP_HOLDING_KEY = 'TEMP_HOLDING_KEY'

/**
 * @load ./get.doc.md
 * @memberof flat
 * @param {FlattenParams}   params      flatten params from which property has to be taken
 * @param {string}          [propertyPath]  name of the property
 * @returns {any}                       when property key exists directly it returns what is inside,
 *                                      otherwise it tries to find any nested objects and returns
 *                                      them
 */
const get = (params: FlattenParams = {}, propertyPath?: string): any => {
  if (!propertyPath) {
    return unflatten(params)
  }

  // when object has this key - simply return it
  // we cannot rely on typeof params[propertyPath !== 'undefined' because params can actually be
  // undefined and in such case if would pass and function would return [undefined]
  if (Object.keys(params).find(key => (key === propertyPath))) {
    return params[propertyPath]
  }

  const regex = propertyKeyRegex(propertyPath)
  const selectedParams = selectParams(params, propertyPath)

  const nestedProperties = Object.keys(selectedParams).reduce((memo, key) => ({
    ...memo,
    [key.replace(regex, `${TEMP_HOLDING_KEY}${DELIMITER}`)]: selectedParams[key],
  }), {} as FlattenParams)

  if (Object.keys(nestedProperties).length) {
    return (unflatten(nestedProperties) as {})[TEMP_HOLDING_KEY]
  }
  return undefined
}

export { get }
