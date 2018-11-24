const DatabaseFactory = require('./backend/adapters/database-factory')

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

  viewHelpers() {
    const { rootPath } = this.options
    return {
      listUrl: (database, model) => `/${rootPath}/${database.name()}/${model.name()}`,
      newInstanceUrl: (database, model) => `/${rootPath}/${database.name()}/${model.name()}/new`,
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
   * @return {ViewData}                      data which will be used in the views
   */
  toViewData({ databaseName, modelName }) {
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
