"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _designSystem = require("@adminjs/design-system");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const optionsKeys = ['value', 'decimalSeparator', 'groupSeparator', 'disableGroupSeparators', 'intlConfig', 'decimalScale', 'prefix', 'suffix'];
const pickFormatOptions = props => {
  const pickedProps = Object.keys(props).reduce((acc, curr) => {
    if (optionsKeys.includes(curr)) acc[curr] = props[curr];
    return acc;
  }, {});
  return pickedProps;
};
const formatValue = (value, props = {}) => {
  const formatOptions = pickFormatOptions(_objectSpread({
    value
  }, props));
  return (0, _designSystem.formatCurrencyProperty)(formatOptions);
};
var _default = formatValue;
exports.default = _default;