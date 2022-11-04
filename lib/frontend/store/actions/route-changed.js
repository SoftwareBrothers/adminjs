"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeRoute = exports.changeRoute = exports.ROUTE_CHANGED = exports.INITIAL_ROUTE = void 0;
const INITIAL_ROUTE = 'INITIAL_ROUTE';
exports.INITIAL_ROUTE = INITIAL_ROUTE;
const ROUTE_CHANGED = 'ROUTE_CHANGED';
exports.ROUTE_CHANGED = ROUTE_CHANGED;
const initializeRoute = location => ({
  type: ROUTE_CHANGED,
  data: location
});
exports.initializeRoute = initializeRoute;
const changeRoute = location => ({
  type: ROUTE_CHANGED,
  data: location
});
exports.changeRoute = changeRoute;