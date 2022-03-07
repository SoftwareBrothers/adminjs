"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

var _flat = require("flat");

var _constants = require("./constants");

var _selectParams = require("./select-params");

var _propertyKeyRegex = require("./property-key-regex");

const TEMP_HOLDING_KEY = 'TEMP_HOLDING_KEY';
/**
 * @load ./get.doc.md
 * @memberof module:flat
 * @param {FlattenParams}   params      flatten params from which property has to be taken
 * @param {string}          [propertyPath]  name of the property
 * @param {GetOptions}      options     options
 * @returns {any}                       when property key exists directly it returns what is inside,
 *                                      otherwise it tries to find any nested objects and returns
 *                                      them
 */

const get = (params = {}, propertyPath, options) => {
  if (!propertyPath) {
    return (0, _flat.unflatten)(params);
  } // when object has this key - simply return it
  // we cannot rely on typeof params[propertyPath !== 'undefined' because params can actually be
  // undefined and in such case if would pass and function would return [undefined]


  if (Object.keys(params).find(key => key === propertyPath)) {
    return params[propertyPath];
  }

  const regex = (0, _propertyKeyRegex.propertyKeyRegex)(propertyPath, options);
  const selectedParams = (0, _selectParams.selectParams)(params, propertyPath, options);
  const nestedProperties = Object.keys(selectedParams).reduce((memo, key, index) => {
    let newKey = key.replace(regex, `${TEMP_HOLDING_KEY}${_constants.DELIMITER}`); // when user wants to take allSiblings we have to fix the indexes so nested items from
    // different siblings don't overlap
    //
    // Example for key `nested.1.el`:
    //  'nested.0.el.0.value': 'val0.0',
    //  'nested.0.el.1.value': 'val0.1',
    //  'nested.1.el.0.value': 'val1',
    //  'nested.1.el.1.value': 'val2',
    //
    // has to be changed to:
    //  'TEMP_HOLDING_KEY.0.value': 'val0.0',
    //  'TEMP_HOLDING_KEY.1.value': 'val0.1',
    //  'TEMP_HOLDING_KEY.2.value': 'val1',
    //  'TEMP_HOLDING_KEY.3.value': 'val2',

    if (options !== null && options !== void 0 && options.includeAllSiblings) {
      newKey = newKey.replace(new RegExp(`${TEMP_HOLDING_KEY}\\${_constants.DELIMITER}(\\d*)`), `${TEMP_HOLDING_KEY}${_constants.DELIMITER}${index}`);
    }

    memo[newKey] = selectedParams[key];
    return memo;
  }, {});

  if (Object.keys(nestedProperties).length) {
    return (0, _flat.unflatten)(nestedProperties)[TEMP_HOLDING_KEY];
  }

  return undefined;
};

exports.get = get;