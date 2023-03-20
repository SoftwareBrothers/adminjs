import flat from 'flat'

import { FlattenParams } from './flat.types.js'
import { set } from './set.js'

/**
 * Merges params together and returns flatten result
 *
 * @param {any} params
 * @param {Array<any>} ...mergeParams
 * @returns {FlattenParams}
 * @memberof module:flat
 */
const merge = (params: any = {}, ...mergeParams: Array<any>): FlattenParams => {
  const flattenParams = flat.flatten(params)

  // reverse because we merge from right
  return mergeParams.reverse().reduce((globalMemo, mergeParam) => (
    Object.keys(mergeParam)
      .reduce((memo, key) => (set(memo, key, mergeParam[key])), globalMemo)
  ), flattenParams as Record<string, any>)
}

export { merge }
