"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  actions: true
};
exports.actions = void 0;

var _new = require("./new");

Object.keys(_new).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _new[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _new[key];
    }
  });
});

var _edit = require("./edit");

Object.keys(_edit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _edit[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _edit[key];
    }
  });
});

var _show = require("./show");

Object.keys(_show).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _show[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _show[key];
    }
  });
});

var _list = require("./list");

Object.keys(_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _list[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _list[key];
    }
  });
});

var _bulkDelete = require("./bulk-delete");

Object.keys(_bulkDelete).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bulkDelete[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bulkDelete[key];
    }
  });
});

var _action = require("./action.props");

Object.keys(_action).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _action[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _action[key];
    }
  });
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});
const actions = {
  new: _new.New,
  edit: _edit.Edit,
  show: _show.Show,
  list: _list.List,
  bulkDelete: _bulkDelete.BulkDelete
};
exports.actions = actions;