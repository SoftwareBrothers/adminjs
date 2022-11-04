"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireDefault(require("react"));
var _propertyLabel = require("../utils/property-label");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Filter = props => {
  const {
    onChange,
    property,
    filter
  } = props;
  const handleChange = value => {
    onChange(property.path, value);
  };
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    variant: "filter"
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(_designSystem.CurrencyInput, _extends({
    id: property.path,
    name: `filter-${property.path}`,
    onValueChange: handleChange,
    value: filter[property.path]
  }, property.props)));
};
var _default = Filter;
exports.default = _default;