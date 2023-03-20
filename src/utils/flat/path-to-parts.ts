import { PathParts } from './path-parts.type.js'

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
 * @load ./path-to-parts.doc.md
 * @param   {string}              propertyPath
 * @param   {PathToPartsOptions}  options
 * @returns  {PathParts}
 *
 * @memberof module:flat
 * @alias pathToParts
 */
const pathToParts = (propertyPath: string, options: PathToPartsOptions = {}): PathParts => {
  let allParts = propertyPath.split('.')
  if (options.skipArrayIndexes) {
    // eslint-disable-next-line no-restricted-globals
    allParts = allParts.filter((part) => isNaN(+part))
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

export { pathToParts }
