const _ = require('lodash')

const DatabasesParser = require('./backend/adapters/databases-parser')
const ModelFactory = require('./backend/adapters/model-factory')
const Renderer = require('./backend/utils/renderer')
const BaseDecorator = require('./backend/utils/base-decorator')

const defaults = {
  rootPath: 'admin',
  databases: [],
  branding: {
    logo: 'https://softwarebrothers.co/assets/images/software-brothers-logo-compact.svg',
    companyName: 'Company Name',
  },
  models: [],
  authenticate: async () => {
    console.warn('you have to give authenticate function to AdmiBro settings')
    return false
  },
}

/**
 * Main class for Admin extension.
 *
 * Responsibilities are:
 * - parse integration options given in various plugins/middlewares - like rootUrl
 * - convert raw database connections to AbstractDatabases
 *
 * @example
 * const connection = await mongoose.connect(process.env.MONGO_URL)
 * const admin = new Admin({databases: [connection]})
 */
class Admin {
  /**
   * @param  {Object}   options                         options
   * @param  {Object[]} [options.databases=[]]          list of entire database connections
   * @param  {String}   [options.rootPath='admin']      namespace for admin routes
   * @param  {Object[]} [options.models]                list of all models
   */
  constructor(options = {}) {
    this.models = []

    this.options = _.merge(defaults, options)

    this.findModels(options)
  }


  /**
   * Find all models given by user
   */
  findModels({ databases, models }) {
    if (databases && databases.length > 0) {
      const rawModels = DatabasesParser(this.options.databases).reduce((m, database) => {
        return m.concat(database.all())
      }, [])
      this.models = rawModels.map(m => ModelFactory(m.model))
    }
    if (models && models.length > 0) {
      this.models = this.models.concat(models.map((m) => {
        if (m.toString() === '[object Object]') {
          const model = ModelFactory(m.model, m.decorator)
          return model
        }
        return ModelFactory(m)
      }))
    }
  }

  findModel(modelId) {
    return this.models.find(m => m.id() === modelId)
  }

  /**
   * Returns database object
   * @param  {String} name      name of a database
   * @return {AbstractDatabase}
   */
  database(name) {
    return this.databases[name]
  }

  static async renderLogin({ action, errorMessage }) {
    return new Renderer('pages/login', { action, errorMessage }).render()
  }
}

module.exports = Admin

module.exports.BaseDecorator = BaseDecorator
