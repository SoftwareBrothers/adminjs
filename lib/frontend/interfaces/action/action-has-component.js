"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionHasComponent = void 0;

const actionHasComponent = action => typeof action.component !== 'undefined' && action.component === false;

exports.actionHasComponent = actionHasComponent;