"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestParser = require("./request-parser");

Object.keys(_requestParser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _requestParser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _requestParser[key];
    }
  });
});