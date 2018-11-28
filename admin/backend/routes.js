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
 *    controller: this.dashboardController,
 *    action: 'index',
 *  }
 */
class Routes {
  constructor({ admin }) {
    this._admin = admin
    this.dashboardController = new DashboardController({ admin })
    this.instancesController = new InstancesController({ admin })
  }

  all() {
    return [{
      method: 'GET',
      path: '',
      view: 'pages/dashboard',
      controller: this.dashboardController,
      action: 'index',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}',
      view: 'pages/list',
      controller: this.instancesController,
      action: 'index',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/{instanceId}',
      view: 'pages/show',
      controller: this.instancesController,
      action: 'show',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/new',
      view: 'pages/new',
      controller: this.instancesController,
      action: 'new',
    }, {
      method: 'POST',
      path: '/{databaseName}/{modelName}',
      view: 'pages/new',
      controller: this.instancesController,
      action: 'create',
    }, {
      method: 'POST',
      path: '/{databaseName}/{modelName}/{instanceId}',
      view: 'pages/edit',
      controller: this.instancesController,
      action: 'update',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/{instanceId}/edit',
      view: 'pages/edit',
      controller: this.instancesController,
      action: 'edit',
    }, {
      method: 'GET',
      path: '/{databaseName}/{modelName}/{instanceId}/delete',
      view: 'pages/delete',
      controller: this.instancesController,
      action: 'delete',
    }]
  }
}

module.exports = Routes
