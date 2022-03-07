"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializePages = exports.PAGES_INITIALIZE = void 0;
const PAGES_INITIALIZE = 'PAGES_INITIALIZE';
exports.PAGES_INITIALIZE = PAGES_INITIALIZE;

const initializePages = data => ({
  type: PAGES_INITIALIZE,
  data
});

exports.initializePages = initializePages;