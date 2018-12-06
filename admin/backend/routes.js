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
    this.assetsRoot = `${__dirname}/../frontend/assets/`
  }

  assets(){
    return [{
      path:  '/frontend/assets/app.min.js',
      src: [this.assetsRoot, 'scripts/app.min.js'].join('/')
    },
    {
      path:  '/frontend/assets/style.min.css',
      src: [this.assetsRoot, 'styles/style.min.css'].join('/')
    },
    {
      path:  '/frontend/assets/icomoon.eot',
      src: [this.assetsRoot, 'fonts/icomoon.eot'].join('/')
    },
    {
      path:  '/frontend/assets/icomoon.svg',
      src: [this.assetsRoot, 'fonts/icomoon.svg'].join('/')
    },
    {
      path:  '/frontend/assets/icomoon.ttf',
      src: [this.assetsRoot, 'fonts/icomoon.ttf'].join('/')
    },
    {
      path:  '/frontend/assets/icomoon.woff',
      src: [this.assetsRoot, 'fonts/icomoon.woff'].join('/')
    }]
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
