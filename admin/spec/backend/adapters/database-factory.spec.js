const mongoose = require('mongoose')
const DatabaseFactory = require('@backend/adapters/database-factory')
const MongoDatabase = require('@backend/adapters/mongoose/database.js')

describe('DatabaseFactory', function () {
  context('mongoose connection as a parameter', function () {
    before(async function () {
      this.connection = await mongoose.connect(process.env.MONGO_URL)
      this.databases = DatabaseFactory(this.connection)
    })

    after(function () {
      mongoose.connection.close()
    })

    it('builds mongoose databases for each connection', function () {
      expect(this.databases).to.have.lengthOf(1)
      expect(this.databases[0]).to.be.an.instanceOf(MongoDatabase)
    })
  })
})
