"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePath = void 0;

var _filterOutParams = require("./filter-out-params");

var _get = require("./get");

var _set = require("./set");

var _pathToParts = require("./path-to-parts");

var _constants = require("./constants");

/**
 * @load ./remove-path.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {...string} properties
 * @returns {FlattenParams}
 */
const removePath = (params, path) => {
  // by default simply filter out elements from the object
  let filtered = (0, _filterOutParams.filterOutParams)(params, path); // reverse means that we iterate from the closes parent

  const parentPaths = (0, _pathToParts.pathToParts)(path).reverse(); // but if one of the parent is an array

  parentPaths.find((parentPath, parentIndex) => {
    const parent = (0, _get.get)(params, parentPath);

    if (Array.isArray(parent)) {
      // previous element is stringified index like 'property.1'
      const previousPaths = parentPaths[parentIndex - 1].split(_constants.DELIMITER); // so this is the index: 1

      const previousPathIndex = previousPaths[previousPaths.length - 1];
      parent.splice(+previousPathIndex, 1);
      filtered = (0, _set.set)(params, parentPath, parent); // this works just for the firstly found array item, because in case of removing the last one
      // it leaves `[]` as a value.

      return true;
    }

    return false;
  });
  return filtered;
};

exports.removePath = removePath;