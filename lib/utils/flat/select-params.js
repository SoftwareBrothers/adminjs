"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectParams = void 0;

var _propertyKeyRegex = require("./property-key-regex");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @load ./select-params.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string | Array<string>} properties
 * @param {GetOptions} [options]
 * @returns {FlattenParams}
 */
const selectParams = (params, properties, options) => {
  const propertyArray = Array.isArray(properties) ? properties : [properties];
  const selected = propertyArray.filter(propertyPath => !!propertyPath).reduce((globalMemo, propertyPath) => {
    const regex = (0, _propertyKeyRegex.propertyKeyRegex)(propertyPath, options);
    const filtered = Object.keys(params) // filter all keys which starts with property path
    .filter(key => key.match(regex)).reduce((memo, key) => {
      memo[key] = params[key];
      return memo;
    }, {});
    return _objectSpread(_objectSpread({}, globalMemo), filtered);
  }, {});
  return selected;
};

exports.selectParams = selectParams;