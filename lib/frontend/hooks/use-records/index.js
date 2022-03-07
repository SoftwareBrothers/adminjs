"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useRecords = require("./use-records");

Object.keys(_useRecords).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useRecords[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useRecords[key];
    }
  });
});

var _useRecordsResult = require("./use-records-result.type");

Object.keys(_useRecordsResult).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useRecordsResult[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useRecordsResult[key];
    }
  });
});