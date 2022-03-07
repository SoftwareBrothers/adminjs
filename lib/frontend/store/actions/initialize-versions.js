"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeVersions = exports.VERSIONS_INITIALIZE = void 0;
const VERSIONS_INITIALIZE = 'VERSIONS_INITIALIZE';
exports.VERSIONS_INITIALIZE = VERSIONS_INITIALIZE;

const initializeVersions = data => ({
  type: VERSIONS_INITIALIZE,
  data
});

exports.initializeVersions = initializeVersions;