const AbstractDatabase = require('../abstract/database')
const Model = require('./model')

/**
 * Adapter for mongoose database
 */
class Database extends AbstractDatabase {
  constructor(connection) {
    super(connection)
    this.connection = connection
  }

  models() {
    return Model.all(this.connection)
  }

  name() {
    return this.connection.name
  }

  find(modelName) {
    return Model.find(this.connection, modelName)
  }
}

module.exports = Database
