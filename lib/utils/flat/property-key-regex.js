"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyKeyRegex = void 0;

var _constants = require("./constants");

// this is the regex used to find all existing properties starting with a key
const propertyKeyRegex = (propertyPath, options) => {
  const delimiter = new RegExp(`\\${_constants.DELIMITER}`, 'g');
  const escapedDelimiter = `\\${_constants.DELIMITER}`; // but for `nested.1.property.0` it will produce `nested(\.|\.\d+\.)1(\.|\.\d+\.)property.0`
  // and this is intentional because user can give an one index in property path for with deeply
  // nested arrays

  const escapedDelimiterOrIndex = `(${escapedDelimiter}|${escapedDelimiter}\\d+${escapedDelimiter})`;
  const path = options !== null && options !== void 0 && options.includeAllSiblings ? propertyPath.replace(delimiter, escapedDelimiterOrIndex) : propertyPath.replace(delimiter, escapedDelimiter);
  return new RegExp(`^${path}($|${escapedDelimiter})`, '');
};

exports.propertyKeyRegex = propertyKeyRegex;