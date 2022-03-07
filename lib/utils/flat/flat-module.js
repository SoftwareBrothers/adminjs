"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flat = void 0;

var _flat = require("flat");

var _constants = require("./constants");

var _selectParams = require("./select-params");

var _filterOutParams = require("./filter-out-params");

var _set = require("./set");

var _get = require("./get");

var _merge = require("./merge");

var _pathToParts = require("./path-to-parts");

var _removePath = require("./remove-path");

/**
 * @module flat
 * @name flat
 * @new in version 3.3
 * @load ./flat.doc.md
 */
const flat = {
  /**
   * Raw `flatten` function exported from original {@link https://www.npmjs.com/package/flat flat}
   * package.
   */
  flatten: _flat.flatten,

  /**
   * Raw `unflatten` function exported from original {@link https://www.npmjs.com/package/flat flat}
   * package.
   */
  unflatten: _flat.unflatten,
  set: _set.set,
  get: _get.get,
  selectParams: _selectParams.selectParams,
  filterOutParams: _filterOutParams.filterOutParams,
  removePath: _removePath.removePath,
  DELIMITER: _constants.DELIMITER,
  pathToParts: _pathToParts.pathToParts,
  merge: _merge.merge
};
exports.flat = flat;