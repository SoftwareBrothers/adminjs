const DashboardController = require('./controllers/dashboard-controller')
const ResourcesController = require('./controllers/resources-controller')

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
    path: '/frontend/assets/app.min.js',
    src: [ASSETS_ROOT, 'scripts/app.min.js'].join('/'),
  }, {
    path: '/frontend/assets/style.min.css',
    src: [ASSETS_ROOT, 'styles/style.min.css'].join('/'),
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
    Controller: DashboardController,
    action: 'index',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}',
    Controller: ResourcesController,
    action: 'index',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/{action}',
    Controller: ResourcesController,
    action: 'resourceAction',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/record/{recordId}/{action}',
    Controller: ResourcesController,
    action: 'recordAction',
  }, {
    method: 'POST',
    path: '/resources/{resourceId}/{action}',
    Controller: ResourcesController,
    action: 'resourceAction',
  }, {
    method: 'POST',
    path: '/resources/{resourceId}/record/{recordId}/{action}',
    Controller: ResourcesController,
    action: 'recordAction',
  }],
}

module.exports = Router
