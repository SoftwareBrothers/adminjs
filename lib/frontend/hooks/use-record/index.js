"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useRecord = require("./use-record");

Object.keys(_useRecord).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useRecord[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useRecord[key];
    }
  });
});

var _useRecord2 = require("./use-record.type");

Object.keys(_useRecord2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useRecord2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useRecord2[key];
    }
  });
});

var _isEntireRecordGiven = require("./is-entire-record-given");

Object.keys(_isEntireRecordGiven).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isEntireRecordGiven[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isEntireRecordGiven[key];
    }
  });
});

var _mergeRecordResponse = require("./merge-record-response");

Object.keys(_mergeRecordResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mergeRecordResponse[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeRecordResponse[key];
    }
  });
});

var _paramsToFormData = require("./params-to-form-data");

Object.keys(_paramsToFormData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _paramsToFormData[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _paramsToFormData[key];
    }
  });
});

var _updateRecord = require("./update-record");

Object.keys(_updateRecord).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _updateRecord[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _updateRecord[key];
    }
  });
});