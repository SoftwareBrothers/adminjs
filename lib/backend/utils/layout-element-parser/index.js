"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layoutElementParser = require("./layout-element-parser");

Object.keys(_layoutElementParser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _layoutElementParser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _layoutElementParser[key];
    }
  });
});