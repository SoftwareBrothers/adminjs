"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ACTIONS: true
};
exports.ACTIONS = void 0;

var _deleteAction = require("./delete/delete-action");

Object.keys(_deleteAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _deleteAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deleteAction[key];
    }
  });
});

var _showAction = require("./show/show-action");

Object.keys(_showAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _showAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _showAction[key];
    }
  });
});

var _newAction = require("./new/new-action");

Object.keys(_newAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _newAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _newAction[key];
    }
  });
});

var _editAction = require("./edit/edit-action");

Object.keys(_editAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _editAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _editAction[key];
    }
  });
});

var _searchAction = require("./search/search-action");

Object.keys(_searchAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _searchAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _searchAction[key];
    }
  });
});

var _listAction = require("./list/list-action");

Object.keys(_listAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _listAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _listAction[key];
    }
  });
});

var _bulkDeleteAction = require("./bulk-delete/bulk-delete-action");

Object.keys(_bulkDeleteAction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bulkDeleteAction[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bulkDeleteAction[key];
    }
  });
});

var _action = require("./action.interface");

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
const ACTIONS = {
  new: _newAction.NewAction,
  list: _listAction.ListAction,
  show: _showAction.ShowAction,
  edit: _editAction.EditAction,
  delete: _deleteAction.DeleteAction,
  bulkDelete: _bulkDeleteAction.BulkDeleteAction,
  search: _searchAction.SearchAction
};
exports.ACTIONS = ACTIONS;