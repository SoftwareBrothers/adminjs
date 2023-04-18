import flatModule from 'flat'

import { DELIMITER } from './constants.js'
import { selectParams } from './select-params.js'
import { filterOutParams } from './filter-out-params.js'
import { set } from './set.js'
import { get } from './get.js'
import { merge } from './merge.js'
import { pathToParts } from './path-to-parts.js'
import { removePath } from './remove-path.js'

export type FlatModuleType = {
  flatten: typeof flatModule.flatten;
  unflatten: typeof flatModule.unflatten;
  set: typeof set;
  get: typeof get;
  selectParams: typeof selectParams;
  filterOutParams: typeof filterOutParams;
  DELIMITER: typeof DELIMITER;
  pathToParts: typeof pathToParts;
  removePath: typeof removePath;
  merge: typeof merge;
}

/**
 * @module flat
 * @name flat
 * @new in version 3.3
 * @load ./flat.doc.md
 */
export const flat: FlatModuleType = {
  /**
   * Raw `flatten` function exported from original {@link https://www.npmjs.com/package/flat flat}
   * package.
   */
  flatten: flatModule.flatten,
  /**
   * Raw `unflatten` function exported from original {@link https://www.npmjs.com/package/flat flat}
   * package.
   */
  unflatten: flatModule.unflatten,

  set,
  get,
  selectParams,
  filterOutParams,
  removePath,
  DELIMITER,
  pathToParts,
  merge,
}
