const paginate = require('jw-paginate')
const DatabaseFactory = require('./backend/adapters/database-factory')

/**
 * Main class for AdminBro extension
 */
class AdminBro {
  static normalizeDatabases(databases) {
    const dbArray = databases.reduce((mem, db) => mem.concat(DatabaseFactory(db)), [])
    return dbArray.reduce((m, db) => {
      m[db.name()] = db
      return m
    }, {})
  }

  constructor(rawDatabases, options = {}) {
    this.options = {
      rootPath: 'admin',
      ...options,
    }
    this.databases = AdminBro.normalizeDatabases(rawDatabases)
  }

  database(name) {
    return this.databases[name]
  }

  urlBuilder(paths, query) {
    const { rootPath } = this.options
    let url = `/${rootPath}/${paths.join('/')}`
    if (query) {
      const queryString = Object.keys(query).map(key => `${key}=${query[key]}`)
      url = `${url}?${queryString}`
    }
    return url
  }

  viewHelpers() {
    return {
      listUrl: (database, model, query) => this.urlBuilder([database.name(), model.name()], query),
      newInstanceUrl: (database, model) => this.urlBuilder([database.name(), model.name(), 'new']),
      showInstanceUrl: (database, model, instance) => this.urlBuilder([database.name(), model.name(), instance.id()]),
      editInstanceUrl: (database, model, instance) => this.urlBuilder([database.name(), model.name(), instance.id(), 'edit']),

      paginate,
    }
  }

  /**
   * @typedef {ViewData}
   * @property {AbstractDatabase[]}  databases    list off all databases
   * @property {Object}              h            view helpers
   * @property {AbastractDatabase}   [database]   currently selected database
   * @property {AbastractModel}      [model]      currently selected model
   * @property {AbastractProperty[]} [properties] properties of currently selected model
   */

  /**
   * Returns common data used in rendering all PUG templates.
   * @param  {String} [options.databaseName] name of selected database
   * @param  {String} [options.modelName]    name of selected model
   * @param  {String} [options.instanceId]   id of selected instance
   * @return {ViewData}                      data which will be used in the views
   */
  toViewData({ databaseName, modelName, instanceId } = {}) {
    const viewData = {
      databases: Object.values(this.databases),
      h: this.viewHelpers(),
    }
    if (databaseName) {
      viewData.database = this.database(databaseName)
      if (modelName) {
        viewData.model = viewData.database.find(modelName)
        viewData.properties = viewData.model.properties()
      }
    }
    return viewData
  }
}

module.exports = AdminBro
