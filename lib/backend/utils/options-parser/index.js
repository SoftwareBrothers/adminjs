"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _optionsParser = require("./options-parser");

Object.keys(_optionsParser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _optionsParser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _optionsParser[key];
    }
  });
});