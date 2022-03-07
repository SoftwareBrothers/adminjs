"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathToParts = void 0;

/**
 * @memberof module:flat
 * @alias PathToPartsOptions
 */

/**
 * @load ./path-to-parts.doc.md
 * @param   {string}              propertyPath
 * @param   {PathToPartsOptions}  options
 * @returns  {PathParts}
 *
 * @memberof module:flat
 * @alias pathToParts
 */
const pathToParts = (propertyPath, options = {}) => {
  let allParts = propertyPath.split('.');

  if (options.skipArrayIndexes) {
    // eslint-disable-next-line no-restricted-globals
    allParts = allParts.filter(part => isNaN(+part));
  }

  return allParts.reduce((memo, part) => {
    if (memo.length) {
      return [...memo, [memo[memo.length - 1], part].join('.')];
    }

    return [part];
  }, []);
};

exports.pathToParts = pathToParts;