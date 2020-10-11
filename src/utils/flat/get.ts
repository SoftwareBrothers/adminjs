import { unflatten } from 'flat'
import { DELIMITER } from './constants'
import { selectParams } from './filter-params'
import { FlattenParams } from '../flat'
import { propertyKeyRegex } from './property-key-regex'

const TEMP_HOLDING_KEY = 'TEMP_HOLDING_KEY'

/**
 * @memberof module:flat
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

  if (typeof params[propertyPath] !== 'undefined') {
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
