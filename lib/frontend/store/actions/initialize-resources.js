"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeResources = exports.RESOURCES_INITIALIZE = void 0;
const RESOURCES_INITIALIZE = 'RESOURCES_INITIALIZE';
exports.RESOURCES_INITIALIZE = RESOURCES_INITIALIZE;

const initializeResources = data => ({
  type: RESOURCES_INITIALIZE,
  data
});

exports.initializeResources = initializeResources;