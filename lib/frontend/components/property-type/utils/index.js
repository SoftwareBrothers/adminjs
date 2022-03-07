"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propertyLabel = require("./property-label");

Object.keys(_propertyLabel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _propertyLabel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _propertyLabel[key];
    }
  });
});