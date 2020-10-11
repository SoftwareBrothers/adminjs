import { propertyKeyRegex } from './property-key-regex'
import { FlattenParams } from './flat.types'

/**
 *
 * From all params it removes keys starting with property
 *
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string} property
 * @new In version 3.3
 */
const filterOutParams = (params: FlattenParams, property: string): FlattenParams => {
  const regex = propertyKeyRegex(property)

  // filter all keys which starts with property
  return Object.keys(params)
    .filter(key => !key.match(regex))
    .reduce((memo, key) => ({
      ...memo,
      [key]: (params[key] as string),
    }), {} as FlattenParams)
}

export { filterOutParams }
