"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeBranding = exports.BRANDING_INITIALIZE = void 0;
const BRANDING_INITIALIZE = 'BRANDING_INITIALIZE';
exports.BRANDING_INITIALIZE = BRANDING_INITIALIZE;

const initializeBranding = data => ({
  type: BRANDING_INITIALIZE,
  data
});

exports.initializeBranding = initializeBranding;