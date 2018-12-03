const _ = require('lodash')

const DatabasesParser = require('./backend/adapters/databases-parser')
const ResourceFactory = require('./backend/adapters/resource-factory')
const Renderer = require('./backend/utils/renderer')
const BaseDecorator = require('./backend/utils/base-decorator')

const Routes = require('./backend/routes')

/**
 * @typedef {Object} Settings
 */
const defaults = {
  rootPath: '/admin',
  logoutPath: '/admin/logout',
  loginPath: '/admin/login',
  databases: [],
  resources: [],
  branding: {
    logo: 'https://softwarebrothers.co/assets/images/software-brothers-logo-compact.svg',
    companyName: 'Company Name',
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
   * @param  {Object[]} [options.resources]                list of all resources
   */
  constructor(options = {}) {
    this.resources = []

    this.options = _.merge(defaults, options)

    this.findResources(options)
  }


  /**
   * Find all resources given by user
   */
  findResources({ databases, resources }) {
    this.resources = []
    if (resources && resources.length > 0) {
      this.resources = this.resources.concat(resources.map((m) => {
        if (m.toString() === '[object Object]') {
          const resource = ResourceFactory(m.resource, m.decorator)
          return resource
        }
        return ResourceFactory(m)
      }))
    }
    if (databases && databases.length > 0) {
      const rawResources = DatabasesParser(this.options.databases).reduce((memo, database) => {
        return memo.concat(database.resources())
      }, [])
      const resourcesToAdd = rawResources.map(m => ResourceFactory(m)).filter((m) => {
        // ensure that resource is not there yet
        return !this.resources.find(em => em.id() === m.id())
      })
      this.resources = this.resources.concat(resourcesToAdd)
    }
  }

  findResource(resourceId) {
    return this.resources.find(m => m.id() === resourceId)
  }

  static async renderLogin({ action, errorMessage }) {
    return new Renderer('pages/login', { action, errorMessage }).render()
  }
}

Admin.BaseDecorator = BaseDecorator
Admin.Routes = Routes

module.exports = Admin
