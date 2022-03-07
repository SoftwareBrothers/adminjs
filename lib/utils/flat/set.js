"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = void 0;

var _flat = require("flat");

var _constants = require("./constants");

var _propertyKeyRegex = require("./property-key-regex");

var _pathToParts = require("./path-to-parts");

const isObject = value => {
  // Node environment
  if (typeof File === 'undefined') {
    return typeof value === 'object' && value !== null;
  } // Window environment


  return typeof value === 'object' && !(value instanceof File) && value !== null;
};
/**
 * @load ./set.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string} propertyPath
 * @param {any} [value]       if not give function will only try to remove old keys
 * @returns {FlattenParams}
 */


const set = (params = {}, propertyPath, value) => {
  const regex = (0, _propertyKeyRegex.propertyKeyRegex)(propertyPath); // remove all existing keys

  const paramsCopy = Object.keys(params).filter(key => !key.match(regex)).reduce((memo, key) => {
    memo[key] = params[key];
    return memo;
  }, {});

  if (typeof value !== 'undefined') {
    if (isObject(value) && !(value instanceof Date)) {
      const flattened = (0, _flat.flatten)(value);

      if (Object.keys(flattened).length) {
        Object.keys(flattened).forEach(key => {
          paramsCopy[`${propertyPath}${_constants.DELIMITER}${key}`] = flattened[key];
        });
      } else if (Array.isArray(value)) {
        paramsCopy[propertyPath] = [];
      } else {
        paramsCopy[propertyPath] = {};
      }
    } else {
      paramsCopy[propertyPath] = value;
    } // when user gave { "nested.value": "something" } and had "nested" set to `null`, then
    // nested should be removed


    const parts = (0, _pathToParts.pathToParts)(propertyPath).slice(0, -1);

    if (parts.length) {
      return Object.keys(paramsCopy).filter(key => !parts.includes(key)).reduce((memo, key) => {
        memo[key] = paramsCopy[key];
        return memo;
      }, {});
    }
  }

  return paramsCopy;
};

exports.set = set;