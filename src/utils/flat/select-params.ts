import { propertyKeyRegex } from './property-key-regex'
import { FlattenParams } from './flat.types'

/**
 * @load ./select-params.doc.md
 * @memberof flat
 * @param {FlattenParams} params
 * @param {...string} properties
 * @returns {FlattenParams}
 */
const selectParams = (params: FlattenParams, ...properties: Array<string>): FlattenParams => (
  properties.reduce((globalMemo, property) => {
    const regex = propertyKeyRegex(property)
    const filtered = Object.keys(params)
      // filter all keys which starts with property
      .filter(key => key.match(regex))
      .reduce((memo, key) => ({
        ...memo,
        [key]: (params[key] as string),
      }), {} as FlattenParams)
    return {
      ...globalMemo,
      ...filtered,
    }
  }, {} as FlattenParams)
)

export { selectParams }
