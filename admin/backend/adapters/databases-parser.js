const DatabaseFactory = require('./database-factory')

const DatabasesParser = (databases) => {
  const dbArray = databases.reduce((mem, db) => mem.concat(DatabaseFactory(db)), [])
  return dbArray.reduce((m, db) => {
    m[db.name()] = db
    return m
  }, {})
}

module.exports = DatabasesParser
