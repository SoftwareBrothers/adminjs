"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PropertyLabel = void 0;

var _designSystem = require("@adminjs/design-system");

var _react = _interopRequireDefault(require("react"));

var _propertyDescription = require("../property-description");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const PropertyLabel = props => {
  const {
    property,
    props: labelProps
  } = props;

  if (property.hideLabel) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_designSystem.Label, _extends({
    htmlFor: property.path,
    required: property.isRequired
  }, labelProps), property.label, property.description && /*#__PURE__*/_react.default.createElement(_propertyDescription.PropertyDescription, {
    property: property
  }));
};

exports.PropertyLabel = exports.default = PropertyLabel;