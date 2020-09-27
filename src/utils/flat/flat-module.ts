import { flatten, unflatten } from 'flat'

import { DELIMITER } from './constants'
import { filterParams } from './filter-params'
import { set } from './set'
import { get } from './get'

/**
 *
 * @memberof module:flat
 */
export type FlatModuleType = {
  flatten: typeof flatten;
  unflatten: typeof unflatten;
  set: typeof set;
  get: typeof get;
  filterParams: typeof filterParams;
  DELIMITER: typeof DELIMITER;
}

/**
 * All the data in records are stored in flatten version.
 *
 * Helpers gathered in this module will help you manage them
 *
 * @module flat
 * @new
 */
export const flat: FlatModuleType = {
  /**
   * Raw `flatten` function exported from original `flat` package.
   */
  flatten,
  /**
   * Raw `unflatten` function exported from original `flat` package.
   */
  unflatten,
  set,
  get,
  filterParams,
  DELIMITER,
}
