"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeAssets = exports.ASSETS_INITIALIZE = void 0;
const ASSETS_INITIALIZE = 'ASSETS_INITIALIZE';
exports.ASSETS_INITIALIZE = ASSETS_INITIALIZE;

const initializeAssets = data => ({
  type: ASSETS_INITIALIZE,
  data
});

exports.initializeAssets = initializeAssets;