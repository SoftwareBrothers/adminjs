"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Sidebar: true
};
Object.defineProperty(exports, "Sidebar", {
  enumerable: true,
  get: function () {
    return _sidebar.default;
  }
});

var _sidebar = _interopRequireDefault(require("./sidebar"));

var _sidebarResourceSection = require("./sidebar-resource-section");

Object.keys(_sidebarResourceSection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _sidebarResourceSection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sidebarResourceSection[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }