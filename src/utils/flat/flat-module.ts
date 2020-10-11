import { flatten, unflatten } from 'flat'

import { DELIMITER } from './constants'
import { selectParams, filterOutParams } from './filter-params'
import { set } from './set'
import { get } from './get'
import { pathToParts } from './path-to-parts'

/**
 *
 * @memberof module:flat
 */
export type FlatModuleType = {
  flatten: typeof flatten;
  unflatten: typeof unflatten;
  set: typeof set;
  get: typeof get;
  selectParams: typeof selectParams;
  filterOutParams: typeof filterOutParams;
  DELIMITER: typeof DELIMITER;
  pathToParts: typeof pathToParts;
}

/**
 * All the data in records are stored in flatten version.
 *
 * Helpers gathered in this module will help you manage them
 *
 * ### Usage
 *
 * ```javascript
 * // on the frontend (i.e in components)
 * import { flat } from 'admin-bro'
 *
 * // on the backend (i.e. in action hooks)
 * const { flat } = require('admin-bro')
 *
 * flat.set(...)
 * ```
 *
 * @module flat
 * @name flat
 * @new In version 3.3
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
  selectParams,
  filterOutParams,
  DELIMITER,
  pathToParts,
}
