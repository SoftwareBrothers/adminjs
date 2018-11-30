const DashboardController = require('./controllers/dashboard-controller')
const ModelsController = require('./controllers/models-controller')

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
      path: '/models/{modelName}',
      Controller: ModelsController,
      action: 'index',
    }, {
      method: 'GET',
      path: '/models/{modelName}/{instanceId}',
      Controller: ModelsController,
      action: 'show',
    }, {
      method: 'GET',
      path: '/models/{modelName}/new',
      Controller: ModelsController,
      action: 'new',
    }, {
      method: 'POST',
      path: '/models/{modelName}',
      Controller: ModelsController,
      action: 'create',
    }, {
      method: 'POST',
      path: '/models/{modelName}/{instanceId}',
      Controller: ModelsController,
      action: 'update',
    }, {
      method: 'GET',
      path: '/models/{modelName}/{instanceId}/edit',
      Controller: ModelsController,
      action: 'edit',
    }, {
      method: 'GET',
      path: '/models/{modelName}/{instanceId}/delete',
      Controller: ModelsController,
      action: 'delete',
    }]
  }
}

module.exports = Routes
