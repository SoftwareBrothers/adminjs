"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _getComponentHtml = require("./get-component-html");
Object.keys(_getComponentHtml).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getComponentHtml[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getComponentHtml[key];
    }
  });
});