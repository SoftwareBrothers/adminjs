const DatabasesParser = require('./backend/adapters/databases-parser')

/**
 * Main class for Admin extension
 */
class Admin {
  constructor(rawDatabases, options = {}) {
    this.options = {
      rootPath: 'admin',
      ...options,
    }
    this.databases = DatabasesParser(rawDatabases)
  }

  database(name) {
    return this.databases[name]
  }
}

module.exports = Admin
