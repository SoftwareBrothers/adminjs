const DashboardController = require('./controllers/dashboard-controller')
const InstancesController = require('./controllers/instances-controller')

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
      path: '/{databaseName}/{modelName}',
      Controller: InstancesController,
      action: 'index',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/{instanceId}',
      Controller: InstancesController,
      action: 'show',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/new',
      Controller: InstancesController,
      action: 'new',
    }, {
      method: 'POST',
      path: '/{databaseName}/{modelName}',
      Controller: InstancesController,
      action: 'create',
    }, {
      method: 'POST',
      path: '/{databaseName}/{modelName}/{instanceId}',
      Controller: InstancesController,
      action: 'update',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/{instanceId}/edit',
      Controller: InstancesController,
      action: 'edit',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/{instanceId}/delete',
      Controller: InstancesController,
      action: 'delete',
    }]
  }
}

module.exports = Routes
