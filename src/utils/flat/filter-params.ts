import { propertyKeyRegex } from './property-key-regex'
import { FlattenParams } from '.'

/**
 *
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string} property
 * @new
 */
export const filterParams = (params: FlattenParams, property: string): FlattenParams => {
  const regex = propertyKeyRegex(property)

  // filter all keys which starts with property
  return Object.keys(params)
    .filter(key => key.match(regex))
    .reduce((memo, key) => ({
      ...memo,
      [key]: (params[key] as string),
    }), {} as FlattenParams)
}
