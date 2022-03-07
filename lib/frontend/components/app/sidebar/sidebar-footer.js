"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SidebarFooter = () => /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
  mt: "lg"
}, /*#__PURE__*/_react.default.createElement(_designSystem.SoftwareBrothers, null));

var _default = (0, _allowOverride.default)(SidebarFooter, 'SidebarFooter');

exports.default = _default;