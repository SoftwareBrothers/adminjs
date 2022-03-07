"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  defaultLocale: true
};
Object.defineProperty(exports, "defaultLocale", {
  enumerable: true,
  get: function () {
    return _en.default;
  }
});

var _en = _interopRequireDefault(require("./en"));

var _config = require("./config");

Object.keys(_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _config[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _config[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }