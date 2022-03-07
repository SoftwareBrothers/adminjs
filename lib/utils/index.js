"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _translateFunctions = require("./translate-functions.factory");

Object.keys(_translateFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _translateFunctions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _translateFunctions[key];
    }
  });
});

var _flat = require("./flat");

Object.keys(_flat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _flat[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flat[key];
    }
  });
});

var _paramConverter = require("./param-converter");

Object.keys(_paramConverter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _paramConverter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _paramConverter[key];
    }
  });
});