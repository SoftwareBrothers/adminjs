const DatabaseFactory = require('./database-factory')

const DatabasesParser = (databases) => {
  const dbArray = databases.reduce((memo, db) => memo.concat(DatabaseFactory(db)), [])
  return dbArray
}

module.exports = DatabasesParser
