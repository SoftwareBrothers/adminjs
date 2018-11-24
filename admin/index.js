const DatabasesParser = require('./backend/adapters/databases-parser')

/**
 * Main class for Admin extension.
 *
 * Responsibilities are:
 * - parse integration options given in various plugins/middlewares - like rootUrl
 * - convert raw database connections to AbstractDatabases
 *
 * @example
 * const connection = await mongoose.connect(process.env.MONGO_URL)
 * const admin = new Admin([connection], options)
 *
 * admin.databases //list of all AbstractDatabases
 */
class Admin {
  /**
   * @param  {Object[]} rawDatabases array of databases which can be handled by AdminBro
   * @param  {Object} options      options
   */
  constructor(rawDatabases, options = {}) {
    this.options = {
      rootPath: 'admin',
      ...options,
    }
    this.databases = DatabasesParser(rawDatabases)
  }

  /**
   * Returns database object
   * @param  {String} name      name of a database
   * @return {AbstractDatabase}
   */
  database(name) {
    return this.databases[name]
  }
}

module.exports = Admin
