import { propertyKeyRegex } from './property-key-regex'
import { FlattenParams } from './flat.types'

/**
 *
 * From all params it selects only those starting with property
 *
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {...string} properties
 * @new In version 3.3
 */
const selectParams = (params: FlattenParams, ...properties: Array<string>): FlattenParams => (
  properties.reduce((globalMemo, property) => {
    const regex = propertyKeyRegex(property)
    const filtered = Object.keys(params)
      // filter all keys which starts with property
      .filter(key => key.match(regex))
      .reduce((memo, key) => {
        memo[key] = (params[key] as string)

        return memo
      }, {} as FlattenParams)
    return {
      ...globalMemo,
      ...filtered,
    }
  }, {} as FlattenParams)
)

export { selectParams }
