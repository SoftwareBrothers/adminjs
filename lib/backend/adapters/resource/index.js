"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  BaseResource: true
};
Object.defineProperty(exports, "BaseResource", {
  enumerable: true,
  get: function () {
    return _baseResource.default;
  }
});

var _baseResource = _interopRequireDefault(require("./base-resource"));

var _supportedDatabases = require("./supported-databases.type");

Object.keys(_supportedDatabases).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _supportedDatabases[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _supportedDatabases[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }