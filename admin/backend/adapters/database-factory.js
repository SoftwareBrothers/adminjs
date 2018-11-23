const MongooseDatabase = require('./mongoose/database')

const DatabaseFactory = (database) => {
  if (database.constructor.name === 'Mongoose') {
    return database.connections.map(connection => new MongooseDatabase(connection))
  }
  throw new Error(`unsupported database type ${database}`)
}

module.exports = DatabaseFactory
