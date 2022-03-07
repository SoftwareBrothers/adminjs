"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ResourceDecorator: true
};
Object.defineProperty(exports, "ResourceDecorator", {
  enumerable: true,
  get: function () {
    return _resourceDecorator.default;
  }
});

var _resourceDecorator = _interopRequireDefault(require("./resource-decorator"));

var _resourceOptions = require("./resource-options.interface");

Object.keys(_resourceOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _resourceOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _resourceOptions[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }