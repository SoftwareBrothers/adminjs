"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var _defaultPropertyValue = _interopRequireDefault(require("../default-type/default-property-value"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Show = props => {
  const {
    property
  } = props;
  return /*#__PURE__*/_react.default.createElement(_designSystem.ValueGroup, {
    label: property.label
  }, /*#__PURE__*/_react.default.createElement(_defaultPropertyValue.default, props));
};
var _default = Show;
exports.default = _default;