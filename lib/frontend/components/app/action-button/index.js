"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionButton = require("./action-button");

Object.keys(_actionButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _actionButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _actionButton[key];
    }
  });
});