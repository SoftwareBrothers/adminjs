"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToSubProperty = void 0;

var _constants = require("../../../../utils/flat/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Converts property: PropertyJSON from an array to a sub-property for an actual item in the array
 * It change path that it has index inside along with the label. Futhermore flat isArray is removed
 * ,because it was already handled, so that itemRenderer can render property as a regular one
 *
 * @param {PropertyJSON}  arrayProperty property with path set to an root Array type property,
 * @param {Number}        index         index under which sub-property should be placed
 * @private
 * @hide
 */
const convertToSubProperty = (arrayProperty, index) => _objectSpread(_objectSpread({}, arrayProperty), {}, {
  path: [arrayProperty.path, index].join(_constants.DELIMITER),
  label: `[${index + 1}]`,
  isArray: false,
  isDraggable: false
});

exports.convertToSubProperty = convertToSubProperty;