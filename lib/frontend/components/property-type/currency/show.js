"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireDefault(require("react"));
var _formatValue = _interopRequireDefault(require("./format-value"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Show = props => {
  const {
    property,
    record
  } = props;
  const value = `${record.params[property.path]}`;
  return /*#__PURE__*/_react.default.createElement(_designSystem.ValueGroup, {
    label: property.label
  }, (0, _formatValue.default)(value, property.props));
};
var _default = Show;
exports.default = _default;