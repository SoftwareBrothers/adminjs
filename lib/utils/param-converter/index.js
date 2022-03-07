"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _paramConverterModule = require("./param-converter-module");

Object.keys(_paramConverterModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _paramConverterModule[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _paramConverterModule[key];
    }
  });
});