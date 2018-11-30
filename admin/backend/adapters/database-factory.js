const MongooseDatabase = require('./mongoose/database')

/**
 * It changes raw database object to correct Database used by AdminBro.
 *
 * @param  {Object} database          database connection
 * @return {AbstractDatabase}         class which extends {@link AbstractDatabase}. Right
 *                                          now only {@link MongooseDatabase} is supported
 */
const DatabaseFactory = (database) => {
  if (database.constructor.name === 'Mongoose') {
    return database.connections.map(connection => new MongooseDatabase(connection))
  }
  throw new Error(`unsupported database type ${database.constructor ? database.constructor.name : database}`)
}

module.exports = DatabaseFactory
