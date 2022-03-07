"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _propertyLabel = require("../utils/property-label");

var _convertToSubProperty = require("./convert-to-sub-property");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Edit = props => {
  const {
    property,
    record,
    ItemComponent
  } = props;
  const error = record.errors && record.errors[property.path];
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: !!error
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Section, property.props, property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => {
    const subPropertyWithPath = (0, _convertToSubProperty.convertToSubProperty)(property, subProperty);
    return /*#__PURE__*/_react.default.createElement(ItemComponent, _extends({}, props, {
      key: subPropertyWithPath.path,
      property: subPropertyWithPath
    }));
  })), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error && error.message));
};

var _default = Edit;
exports.default = _default;