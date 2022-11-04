"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../backend/utils");
var _login = _interopRequireDefault(require("./components/login"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const html = async (admin, {
  action,
  errorMessage
}) => (0, _utils.getComponentHtml)(_login.default, {
  action,
  message: errorMessage
}, admin);
var _default = html;
exports.default = _default;