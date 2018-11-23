const Renderer = require('./backend/utils/renderer')
const DatabaseFactory = require('./backend/adapters/database-factory')

const Admin = {
  name: 'AdminBro',
  version: '1.0.0',
  register: async (server, options) => {
    const rootPath = options.rootPath || 'admin'
    const databases = options.databases.reduce((mem, db) => mem.concat(DatabaseFactory(db)), [])
    const helpers = {
      listUrl: (database, model) => `/${rootPath}/${database.name()}/${model.name()}`,
    }

    const databasesMap = databases.reduce((m, db) => {
      m[db.name()] = db
      return m
    }, {})

    const sharedData = {
      databases,
      helpers,
      h: helpers, // alias
    }

    server.route({
      method: 'GET',
      path: `/${rootPath}`,
      options: {
        auth: false,
      },
      handler: async (request, h) => {
        return new Renderer('pages/dashboard', sharedData).render()
      },
    })

    server.route({
      method: 'GET',
      path: `/${rootPath}/{databaseName}/{modelName}`,
      options: {
        auth: false,
      },
      handler: async (request, h) => {
        const database = databasesMap[request.params.databaseName]
        const model = database.find(request.params.modelName)
        const instances = model.find({}, { limit: 20, offset: 0 })
        const properties = model.properties()
        const data = {
          database,
          model,
          instances,
          properties,
          ...sharedData,
        }
        return new Renderer('pages/list', data).render()
      },
    })
  },
}

module.exports = Admin
