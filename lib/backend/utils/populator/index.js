"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _populator = require("./populator");

Object.keys(_populator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _populator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _populator[key];
    }
  });
});

var _populateProperty = require("./populate-property");

Object.keys(_populateProperty).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _populateProperty[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _populateProperty[key];
    }
  });
});