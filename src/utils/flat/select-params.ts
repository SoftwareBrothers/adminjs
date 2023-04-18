import { propertyKeyRegex } from './property-key-regex.js'
import { FlattenParams, GetOptions } from './flat.types.js'

/**
 * @load ./select-params.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string | Array<string>} properties
 * @param {GetOptions} [options]
 * @returns {FlattenParams}
 */
const selectParams = (
  params: FlattenParams,
  properties: string | Array<string>,
  options?: GetOptions,
): FlattenParams => {
  const propertyArray = Array.isArray(properties) ? properties : [properties]
  const selected = propertyArray
    .filter((propertyPath) => !!propertyPath)
    .reduce((globalMemo, propertyPath) => {
      const regex = propertyKeyRegex(propertyPath, options)
      const filtered = Object.keys(params)
      // filter all keys which starts with property path
        .filter((key) => key.match(regex))
        .reduce((memo, key) => {
          memo[key] = (params[key] as string)
          return memo
        }, {} as FlattenParams)
      return {
        ...globalMemo,
        ...filtered,
      }
    }, {} as FlattenParams)
  return selected
}

export { selectParams }
