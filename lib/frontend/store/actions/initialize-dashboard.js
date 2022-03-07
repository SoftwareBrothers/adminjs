"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeDashboard = exports.DASHBOARD_INITIALIZE = void 0;
const DASHBOARD_INITIALIZE = 'DASHBOARD_INITIALIZE';
exports.DASHBOARD_INITIALIZE = DASHBOARD_INITIALIZE;

const initializeDashboard = data => ({
  type: DASHBOARD_INITIALIZE,
  data
});

exports.initializeDashboard = initializeDashboard;