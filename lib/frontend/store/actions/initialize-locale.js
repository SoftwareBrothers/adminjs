"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeLocale = exports.LOCALE_INITIALIZE = void 0;
const LOCALE_INITIALIZE = 'LOCALE_INITIALIZE';
exports.LOCALE_INITIALIZE = LOCALE_INITIALIZE;

const initializeLocale = data => ({
  type: LOCALE_INITIALIZE,
  data
});

exports.initializeLocale = initializeLocale;