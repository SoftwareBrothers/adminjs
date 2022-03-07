"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _action = require("./action");

Object.keys(_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _action[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _action[key];
    }
  });
});

var _property = require("./property");

Object.keys(_property).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _property[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _property[key];
    }
  });
});

var _resource = require("./resource");

Object.keys(_resource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _resource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _resource[key];
    }
  });
});