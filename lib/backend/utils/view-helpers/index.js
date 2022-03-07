"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _viewHelpers = require("./view-helpers");

Object.keys(_viewHelpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _viewHelpers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _viewHelpers[key];
    }
  });
});