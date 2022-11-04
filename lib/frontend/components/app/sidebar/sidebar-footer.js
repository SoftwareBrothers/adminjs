"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var _reactRedux = require("react-redux");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SidebarFooter = () => {
  const branding = (0, _reactRedux.useSelector)(state => state.branding);
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    mt: "lg",
    mb: "md"
  }, branding.withMadeWithLove && /*#__PURE__*/_react.default.createElement(_designSystem.MadeWithLove, null));
};
var _default = (0, _allowOverride.default)(SidebarFooter, 'SidebarFooter');
exports.default = _default;