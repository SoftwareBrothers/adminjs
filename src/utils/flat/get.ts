import { unflatten } from 'flat'
import { DELIMITER } from './constants'
import { filterParams } from './filter-params'
import { FlattenParams } from '../flat'
import { propertyKeyRegex } from './property-key-regex'

const TEMP_HOLDING_KEY = 'TEMP_HOLDING_KEY'

/**
 *
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string} property
 */
export const get = (params: FlattenParams = {}, property: string): any => {
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
