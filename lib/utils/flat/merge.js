"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = void 0;

var _flat = require("flat");

var _set = require("./set");

/**
 * Merges params together and returns flatten result
 *
 * @param {any} params
 * @param {Array<any>} ...mergeParams
 * @returns {FlattenParams}
 * @memberof module:flat
 */
const merge = (params = {}, ...mergeParams) => {
  const flattenParams = (0, _flat.flatten)(params); // reverse because we merge from right

  return mergeParams.reverse().reduce((globalMemo, mergeParam) => Object.keys(mergeParam).reduce((memo, key) => (0, _set.set)(memo, key, mergeParam[key]), globalMemo), flattenParams);
};

exports.merge = merge;