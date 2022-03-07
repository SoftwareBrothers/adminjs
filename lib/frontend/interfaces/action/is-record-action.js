"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRecordAction = void 0;

const isRecordAction = (params, action) => 'recordId' in params && action.actionType === 'record';

exports.isRecordAction = isRecordAction;