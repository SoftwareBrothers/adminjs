"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildActionTestId = void 0;

const buildActionTestId = action => `action-${action.name}`;

exports.buildActionTestId = buildActionTestId;