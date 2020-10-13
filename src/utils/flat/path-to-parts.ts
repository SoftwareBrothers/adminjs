import { PathParts } from './path-parts.type'

/**
 * @memberof module:flat
 * @alias PathToPartsOptions
 */
export type PathToPartsOptions = {
  /**
   * Indicates if array indexes should be skipped from the outcome.
   */
  skipArrayIndexes?: boolean;
}

/**
 * Changes path with flatten notation, with dots (.) inside, to array of all possible
 * keys which can have a property.
 *
 * - changes: `nested.nested2.normalInner`
 * - to `["nested", "nested.nested2", "nested.nested2.normalInner"]`
 *
 * When skipArrayIndexes is set to true it also it takes care of the arrays, which are
 * separated by numbers (indexes). Then it:
 * - changes: `nested.0.normalInner.1`
 * - to: `nested.normalInner`
 *
 * Everything because when we look for a property of a given path it can be inside a
 * mixed property. So first, we have to find top level mixed property, and then,
 * step by step, find inside each of them.
 *
 * @param   {string}              propertyPath
 * @param   {PathToPartsOptions}  options
 * @return  {PathParts}
 *
 * @memberof module:flat
 * @alias pathToParts
 */
export const pathToParts = (propertyPath: string, options: PathToPartsOptions = {}): PathParts => {
  let allParts = propertyPath.split('.')
  if (options.skipArrayIndexes) {
    // eslint-disable-next-line no-restricted-globals
    allParts = allParts.filter(part => isNaN(+part))
  }
  return allParts.reduce((memo, part) => {
    if (memo.length) {
      return [
        ...memo,
        [memo[memo.length - 1], part].join('.'),
      ]
    }
    return [part]
  }, [] as Array<string>)
}
