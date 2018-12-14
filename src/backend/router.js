const DashboardController = require('./controllers/dashboard-controller')
const ResourcesController = require('./controllers/resources-controller')

const ASSETS_ROOT = `${__dirname}/../frontend/assets/`

/**
 * Contains list of all routes
 *
 * @example
 * // route example
 * {
 *    method: 'GET',
 *    path: '',
 *    view: 'pages/dashboard',
 Controller    controller: this.dashboardController,
 *    action: 'index',
 *  }
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
    path: '/resources/{resourceId}/new',
    Controller: ResourcesController,
    action: 'new',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/{recordId}',
    Controller: ResourcesController,
    action: 'show',
  }, {
    method: 'POST',
    path: '/resources/{resourceId}',
    Controller: ResourcesController,
    action: 'create',
  }, {
    method: 'POST',
    path: '/resources/{resourceId}/{recordId}',
    Controller: ResourcesController,
    action: 'update',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/{recordId}/edit',
    Controller: ResourcesController,
    action: 'edit',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/{recordId}/delete',
    Controller: ResourcesController,
    action: 'delete',
  }, {
    method: 'POST',
    path: '/resources/{resourceId}/{recordId}/{actionId}',
    Controller: ResourcesController,
    action: 'custom',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/{recordId}/{actionId}',
    Controller: ResourcesController,
    action: 'custom',
  }],
}

module.exports = Router
