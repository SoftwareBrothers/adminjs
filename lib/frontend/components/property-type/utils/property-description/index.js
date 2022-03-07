"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propertyDescription = require("./property-description");

Object.keys(_propertyDescription).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _propertyDescription[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _propertyDescription[key];
    }
  });
});