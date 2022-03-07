"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  BaseRecord: true
};
Object.defineProperty(exports, "BaseRecord", {
  enumerable: true,
  get: function () {
    return _baseRecord.default;
  }
});

var _baseRecord = _interopRequireDefault(require("./base-record"));

var _params = require("./params.type");

Object.keys(_params).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _params[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _params[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }