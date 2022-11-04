"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOCS = exports.DEFAULT_PATHS = exports.ADMIN_JS_TMP_DIR = void 0;
/* cspell: disable */
const DOCS = 'https://docs.adminjs.co';
exports.DOCS = DOCS;
const DEFAULT_PATHS = {
  rootPath: '/admin',
  logoutPath: '/admin/logout',
  loginPath: '/admin/login'
};
exports.DEFAULT_PATHS = DEFAULT_PATHS;
const DEFAULT_TMP_DIR = '.adminjs';
const ADMIN_JS_TMP_DIR = typeof process === 'object' ? process.env.ADMIN_JS_TMP_DIR || DEFAULT_TMP_DIR : DEFAULT_TMP_DIR;
exports.ADMIN_JS_TMP_DIR = ADMIN_JS_TMP_DIR;