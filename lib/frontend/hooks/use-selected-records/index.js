"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useSelectedRecords = require("./use-selected-records");

Object.keys(_useSelectedRecords).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useSelectedRecords[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSelectedRecords[key];
    }
  });
});

var _useSelectedRecordsResult = require("./use-selected-records-result.type");

Object.keys(_useSelectedRecordsResult).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useSelectedRecordsResult[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSelectedRecordsResult[key];
    }
  });
});