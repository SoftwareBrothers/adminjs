"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Router = void 0;

var path = _interopRequireWildcard(require("path"));

var _userComponentsBundler = require("../../bundler/user-components-bundler");

var _appController = _interopRequireDefault(require("../../controllers/app-controller"));

var _apiController = _interopRequireDefault(require("../../controllers/api-controller"));

var _bundlerEnv = _interopRequireDefault(require("../../bundler/bundler-env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ASSETS_ROOT = `${__dirname}/../../../frontend/assets/`;
/**
 * Type representing the AdminJS.Router
 * @memberof Router
 * @alias RouterType
 */

/**
 * @load ./router.doc.md
 * @namespace
 */
const Router = {
  assets: [{
    path: '/frontend/assets/icomoon.css',
    src: path.join(ASSETS_ROOT, 'styles/icomoon.css')
  }, {
    path: '/frontend/assets/icomoon.eot',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.eot')
  }, {
    path: '/frontend/assets/icomoon.svg',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.svg')
  }, {
    path: '/frontend/assets/icomoon.ttf',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.ttf')
  }, {
    path: '/frontend/assets/icomoon.woff',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.woff')
  }, {
    path: '/frontend/assets/app.bundle.js',
    src: path.join(ASSETS_ROOT, `scripts/app-bundle.${_bundlerEnv.default}.js`)
  }, {
    path: '/frontend/assets/global.bundle.js',
    src: path.join(ASSETS_ROOT, `scripts/global-bundle.${_bundlerEnv.default}.js`)
  }, {
    path: '/frontend/assets/design-system.bundle.js',
    src: path.join(path.parse(require.resolve('@adminjs/design-system')).dir, `../bundle.${_bundlerEnv.default}.js`)
  }, {
    path: '/frontend/assets/logo.svg',
    src: path.join(ASSETS_ROOT, 'images/logo.svg')
  }, {
    path: '/frontend/assets/logo-mini.svg',
    src: path.join(ASSETS_ROOT, 'images/logo-mini.svg')
  }],
  routes: [{
    method: 'GET',
    path: '',
    Controller: _appController.default,
    action: 'index'
  }, {
    method: 'GET',
    path: '/resources/{resourceId}',
    Controller: _appController.default,
    action: 'resource'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/search/{query}',
    Controller: _apiController.default,
    action: 'search'
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/actions/{action}',
    Controller: _appController.default,
    action: 'resourceAction'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/actions/{action}',
    Controller: _apiController.default,
    action: 'resourceAction'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/actions/{action}/{query}',
    Controller: _apiController.default,
    action: 'resourceAction'
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/actions/{action}',
    Controller: _apiController.default,
    action: 'resourceAction'
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/records/{recordId}/{action}',
    Controller: _appController.default,
    action: 'recordAction'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/records/{recordId}/{action}',
    Controller: _apiController.default,
    action: 'recordAction'
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/records/{recordId}/{action}',
    Controller: _apiController.default,
    action: 'recordAction'
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/bulk/{action}',
    Controller: _appController.default,
    action: 'bulkAction'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/bulk/{action}',
    Controller: _apiController.default,
    action: 'bulkAction'
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/bulk/{action}',
    Controller: _apiController.default,
    action: 'bulkAction'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/search/',
    Controller: _apiController.default,
    action: 'search'
  }, {
    method: 'GET',
    path: '/api/dashboard',
    Controller: _apiController.default,
    action: 'dashboard'
  }, // Pages
  {
    method: 'GET',
    path: '/pages/{pageName}',
    Controller: _appController.default,
    action: 'page'
  }, {
    method: 'GET',
    path: '/api/pages/{pageName}',
    Controller: _apiController.default,
    action: 'page'
  }, {
    method: 'POST',
    path: '/api/pages/{pageName}',
    Controller: _apiController.default,
    action: 'page'
  }]
};
exports.Router = Router;

if (process.env.NODE_ENV === 'production') {
  Router.assets.push({
    path: '/frontend/assets/components.bundle.js',
    src: _userComponentsBundler.outPath
  });
} else {
  Router.routes.push({
    method: 'GET',
    path: '/frontend/assets/components.bundle.js',
    Controller: _appController.default,
    action: 'bundleComponents',
    contentType: 'text/javascript;charset=utf-8'
  });
}

var _default = Router;
exports.default = _default;