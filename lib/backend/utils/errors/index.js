"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _appError = require("./app-error");
Object.keys(_appError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _appError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _appError[key];
    }
  });
});
var _configurationError = require("./configuration-error");
Object.keys(_configurationError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _configurationError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _configurationError[key];
    }
  });
});
var _forbiddenError = require("./forbidden-error");
Object.keys(_forbiddenError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _forbiddenError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _forbiddenError[key];
    }
  });
});
var _notFoundError = require("./not-found-error");
Object.keys(_notFoundError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _notFoundError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _notFoundError[key];
    }
  });
});
var _notImplementedError = require("./not-implemented-error");
Object.keys(_notImplementedError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _notImplementedError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _notImplementedError[key];
    }
  });
});
var _recordError = require("./record-error");
Object.keys(_recordError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _recordError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _recordError[key];
    }
  });
});
var _validationError = require("./validation-error");
Object.keys(_validationError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _validationError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _validationError[key];
    }
  });
});