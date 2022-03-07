"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overrideFromOptions = overrideFromOptions;

function overrideFromOptions(optionName, property, options) {
  if (typeof options[optionName] === 'undefined') {
    return property[optionName]();
  }

  return options[optionName];
}