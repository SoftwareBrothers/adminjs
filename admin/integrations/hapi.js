const Admin = require('../index')
const Routes = require('../backend/routes')
const Renderer = require('../backend/utils/renderer')

module.exports = {
  name: 'AdminBro',
  version: '1.0.0',
  register: async (server, options) => {
    const admin = new Admin(options.databases, options)
    const routes = new Routes({ admin }).all()

    routes.forEach((route) => {
      server.route({
        method: route.method,
        path: `/${admin.options.rootPath}${route.path}`,
        handler: async (request, h) => {
          const response = await route.controller[route.action](request, h)
          if (!response) {
            return new Renderer(route.view, route.controller.view).render()
          }
          return response
        },
      })
    })
  },
}
