"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHeader = require("./action-header");

Object.keys(_actionHeader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _actionHeader[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _actionHeader[key];
    }
  });
});

var _actionHeaderProps = require("./action-header-props");

Object.keys(_actionHeaderProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _actionHeaderProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _actionHeaderProps[key];
    }
  });
});