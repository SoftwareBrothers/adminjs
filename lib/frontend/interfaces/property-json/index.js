"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propertyJson = require("./property-json.interface");

Object.keys(_propertyJson).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _propertyJson[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _propertyJson[key];
    }
  });
});