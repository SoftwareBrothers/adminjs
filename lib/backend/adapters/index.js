"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require("./database");

Object.keys(_database).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _database[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _database[key];
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

var _record = require("./record");

Object.keys(_record).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _record[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _record[key];
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