/**
 * @namespace MongooseAdapter
 */

const BaseDatabase = require('../base/database')

/**
 * Adapter for mongoose database
 * @memberof MongooseAdapter
 * @extends {BaseDatabase}
 * @alias MongooseAdapter.Database
 */
class Database extends BaseDatabase {
  constructor(connection) {
    super(connection)
    this.connection = connection
  }

  /**
   * Return all available resources for given connection
   * @return {Resource[]}                      list of all resources in given mongo database
   *
   * @example
   * const mongoose = require('mongoose')
   *
   * const connection = await mongoose.connect(process.env.MONGO_URL)
   * new Database(connection).resources()
   */
  resources() {
    return this.connection.modelNames().map(name => this.connection.model(name))
  }
}

module.exports = Database
