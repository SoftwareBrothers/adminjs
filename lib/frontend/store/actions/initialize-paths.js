"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializePaths = exports.PATHS_INITIALIZE = void 0;
const PATHS_INITIALIZE = 'PATHS_INITIALIZE';
exports.PATHS_INITIALIZE = PATHS_INITIALIZE;

const initializePaths = data => ({
  type: PATHS_INITIALIZE,
  data
});

exports.initializePaths = initializePaths;