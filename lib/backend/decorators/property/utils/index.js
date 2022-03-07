"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overrideFromOptions = require("./override-from-options");

Object.keys(_overrideFromOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _overrideFromOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _overrideFromOptions[key];
    }
  });
});