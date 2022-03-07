"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isResourceAction = void 0;

const isResourceAction = (params, action) => 'recordIds' in params && action.actionType === 'resource';

exports.isResourceAction = isResourceAction;