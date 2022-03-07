"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useResource = require("./use-resource");

Object.keys(_useResource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useResource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useResource[key];
    }
  });
});