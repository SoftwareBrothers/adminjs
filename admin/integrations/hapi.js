const routes = require('require.all')({ dir: '../backend/routes' })
const AdminBro = require('../index')

module.exports = {
  name: 'AdminBro',
  version: '1.0.0',
  register: async (server, options) => {
    const adminBro = new AdminBro(options.databases, options)
    for (const key in routes) {
      const route = routes[key]
      server.route({
        method: route.method,
        path: `/${adminBro.options.rootPath}${route.path}`,
        handler: async request => route.handler(adminBro, request.params),
      })
    }
  },
}
