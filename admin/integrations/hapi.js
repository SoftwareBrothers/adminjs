/**
 * Plugin definition for Hapi.js framework. To se how you can use it
 * see {@link examples/hapijs/index.js}
 *
 * @see module:examples/hapijs~start
 *
 * @module Integrations/hapijs
 */

const Boom = require('boom')
const inert = require('inert')
const AdminBro = require('../index.js')
const Routes = require('../backend/routes')

module.exports = {
  name: 'AdminBro',
  version: '1.0.0',
  register: async (server, options) => {
    const admin = new AdminBro(options)
    const auth = options.auth || false
    const routes = new Routes({ admin })
    const pages = routes.all()
    const assets = routes.assets()

    pages.forEach((route) => {
      server.route({
        method: route.method,
        path: `${admin.options.rootPath}${route.path}`,
        options: { auth },
        handler: async (request, h) => {
          try {
            const loggedInUser = request.auth && request.auth.credentials
            const controller = new route.Controller({ admin }, loggedInUser)
            const ret = await controller[route.action](request, h)
            return ret
          } catch (e) {
            console.log(e)
            throw Boom.boomify(e)
          }
        },
      })
    })

    await server.register(inert);
    assets.forEach(asset => {
      server.route({
        method: 'GET',
        path: `${admin.options.rootPath}${asset.path}`,
        handler: {
          file: function (request) {
            return asset.src;
          }
        }
      })
    })

    return admin
  },
  renderLogin: async (params) => {
    return AdminBro.renderLogin(params)
  },
}
