"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertNestedParam = void 0;

var _constants = require("./constants");

var _convertParam = require("./convert-param");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const convertNestedParam = (parentValue, subProperty) => {
  const path = subProperty.propertyPath.split(_constants.DELIMITER).slice(-1)[0];
  const {
    type = 'string'
  } = subProperty;
  let value = parentValue[path];

  if (type === 'mixed') {
    const nestedSubProperties = subProperty.subProperties;

    for (const nestedSubProperty of nestedSubProperties) {
      if (subProperty.isArray) {
        value = [...value].map(element => convertNestedParam(element, nestedSubProperty));
      } else {
        value = convertNestedParam(value, nestedSubProperty);
      }
    }
  } else {
    value = (0, _convertParam.convertParam)(value, subProperty.type);
  }

  return _objectSpread(_objectSpread({}, parentValue), {}, {
    [path]: value
  });
};

exports.convertNestedParam = convertNestedParam;