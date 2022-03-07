"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentAdmin = exports.SESSION_INITIALIZE = void 0;
const SESSION_INITIALIZE = 'SESSION_INITIALIZE';
exports.SESSION_INITIALIZE = SESSION_INITIALIZE;

const setCurrentAdmin = (data = null) => ({
  type: SESSION_INITIALIZE,
  data
});

exports.setCurrentAdmin = setCurrentAdmin;