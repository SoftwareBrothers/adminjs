const DashboardController = require('./controllers/dashboard-controller')
const ResourcesController = require('./controllers/resources-controller')

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
class Routes {
  constructor({ admin }) {
    this._admin = admin
  }

  all() {
    return [{
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
      path: '/resources/{resourceId}/{recordId}',
      Controller: ResourcesController,
      action: 'show',
    }, {
      method: 'GET',
      path: '/resources/{resourceId}/new',
      Controller: ResourcesController,
      action: 'new',
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
    }]
  }
}

module.exports = Routes
