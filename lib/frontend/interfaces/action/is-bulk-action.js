"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBulkAction = void 0;

const isBulkAction = (params, action) => 'recordIds' in params && action.actionType === 'bulk';

exports.isBulkAction = isBulkAction;