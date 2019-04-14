const AppController = require('./controllers/app-controller')
const ApiController = require('./controllers/api-controller')

const ASSETS_ROOT = `${__dirname}/../frontend/assets/`

/**
 * Contains list of all routes grouped to `assets` and `routes`.
 *
 * ```
 * {
 *   assets: [{
 *     path: '/frontend/assets/app.min.js',
 *     src: [ASSETS_ROOT, 'scripts/app.min.js'].join('/'),
 *   }, ...],
 *   routes: [{
 *     method: 'GET',
 *     path: '/resources/{resourceId}',
 *     Controller: ResourcesController,
 *     action: 'index',
 *   }, ...]
 * }
 *
 * ```
 *
 * It is used by supported frameworks to render AdminBro pages.
 *
 * @private
 */
const Router = {
  assets: [{
    path: '/frontend/assets/icomoon.css',
    src: [ASSETS_ROOT, 'styles/icomoon.css'].join('/'),
  }, {
    path: '/frontend/assets/icomoon.eot',
    src: [ASSETS_ROOT, 'fonts/icomoon.eot'].join('/'),
  }, {
    path: '/frontend/assets/icomoon.svg',
    src: [ASSETS_ROOT, 'fonts/icomoon.svg'].join('/'),
  }, {
    path: '/frontend/assets/icomoon.ttf',
    src: [ASSETS_ROOT, 'fonts/icomoon.ttf'].join('/'),
  }, {
    path: '/frontend/assets/icomoon.woff',
    src: [ASSETS_ROOT, 'fonts/icomoon.woff'].join('/'),
  }],
  routes: [{
    method: 'GET',
    path: '',
    Controller: AppController,
    action: 'index',
  }, {
    method: 'GET',
    path: '/frontend/assets/components.bundle.js',
    Controller: AppController,
    action: 'bundleComponents',
  }, {
    method: 'GET',
    path: '/frontend/assets/app.bundle.js',
    Controller: AppController,
    action: 'bundle',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}',
    Controller: AppController,
    action: 'resource',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/actions/{action}',
    Controller: AppController,
    action: 'resourceAction',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/records/{recordId}/{action}',
    Controller: AppController,
    action: 'recordAction',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/actions/{action}',
    Controller: ApiController,
    action: 'resourceAction',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/records/{recordId}/{action}',
    Controller: ApiController,
    action: 'recordAction',
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/actions/{action}',
    Controller: ApiController,
    action: 'resourceAction',
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/records/{recordId}/{action}',
    Controller: ApiController,
    action: 'recordAction',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/search/{query}',
    Controller: ApiController,
    action: 'search',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}',
    Controller: ApiController,
    action: 'index',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/search/',
    Controller: ApiController,
    action: 'search',
  }, {
    method: 'GET',
    path: '/api/dashboard',
    Controller: ApiController,
    action: 'dashboard',
  }],
}

module.exports = Router
