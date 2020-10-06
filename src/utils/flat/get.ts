import { unflatten } from 'flat'
import { DELIMITER } from './constants'
import { filterParams } from './filter-params'
import { FlattenParams } from '../flat'
import { propertyKeyRegex } from './property-key-regex'

const TEMP_HOLDING_KEY = 'TEMP_HOLDING_KEY'

/**
 * @memberof module:flat
 * @param {FlattenParams}   params      flatten params from which property has to be taken
 * @param {string}          [property]  name of the property
 * @returns {any}                       when property key exists directly it returns what is inside,
 *                                      otherwise it tries to find any nested objects and returns
 *                                      them
 */
const get = (params: FlattenParams = {}, property?: string): any => {
  if (!property) {
    return unflatten(params)
  }

  if (params[property]) {
    return params[property]
  }

  const regex = propertyKeyRegex(property)
  const filteredParams = filterParams(params, property)

  const nestedProperties = Object.keys(filteredParams).reduce((memo, key) => ({
    ...memo,
    [key.replace(regex, `${TEMP_HOLDING_KEY}${DELIMITER}`)]: filteredParams[key],
  }), {} as FlattenParams)

  if (Object.keys(nestedProperties).length) {
    return (unflatten(nestedProperties) as {})[TEMP_HOLDING_KEY]
  }
  return undefined
}

export { get }
