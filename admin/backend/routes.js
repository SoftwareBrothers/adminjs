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
      view: 'pages/dashboard',
      Controller: DashboardController,
      action: 'index',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}',
      view: 'pages/list',
      Controller: InstancesController,
      action: 'index',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/{instanceId}',
      view: 'pages/show',
      Controller: InstancesController,
      action: 'show',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/new',
      view: 'pages/new',
      Controller: InstancesController,
      action: 'new',
    }, {
      method: 'POST',
      path: '/{databaseName}/{modelName}',
      view: 'pages/new',
      Controller: InstancesController,
      action: 'create',
    }, {
      method: 'POST',
      path: '/{databaseName}/{modelName}/{instanceId}',
      view: 'pages/edit',
      Controller: InstancesController,
      action: 'update',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/{instanceId}/edit',
      view: 'pages/edit',
      Controller: InstancesController,
      action: 'edit',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/{instanceId}/delete',
      view: 'pages/delete',
      Controller: InstancesController,
      action: 'delete',
    }]
  }
}

module.exports = Routes
