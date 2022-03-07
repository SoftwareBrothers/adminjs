"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layoutElementRenderer = require("./layout-element-renderer");

Object.keys(_layoutElementRenderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _layoutElementRenderer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _layoutElementRenderer[key];
    }
  });
});