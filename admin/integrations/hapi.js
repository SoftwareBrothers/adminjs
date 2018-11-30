/**
 * Plugin definition for Hapi.js framework. To se how you can use it
 * see {@link examples/hapijs/index.js}
 *
 * @see module:examples/hapijs~start
 *
 * @module Integrations/hapijs
 */

const Admin = require('../index')
const Routes = require('../backend/routes')

module.exports = {
  name: 'AdminBro',
  version: '1.0.0',
  register: async (server, options) => {
    const admin = new Admin(options.databases, options)
    const auth = options.auth || false
    const routes = new Routes({ admin }).all()

    routes.forEach((route) => {
      server.route({
        method: route.method,
        path: `${admin.options.rootPath}${route.path}`,
        options: { auth },
        handler: async (request, h) => {
          const loggedInUser = request.auth && request.auth.credentials
          const controller = new route.Controller({ admin }, loggedInUser)
          return controller[route.action](request, h)
        },
      })
    })
  },
  renderLogin: async (params) => {
    return Admin.renderLogin(params)
  },
}
