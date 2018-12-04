const mongoose = require('mongoose')
const MongooseDatabase = require('@backend/adapters/mongoose/database')

describe('Database', function () {
  before(async function () {
    this.collectionName = 'admin-server-test'
    this.mongooseConnection = await mongoose.connect(`mongodb://mongo/${this.collectionName}`)
  })

  after(async function () {
    this.mongooseConnection.connection.close()
  })

  describe('#resources', function () {
    beforeEach(function () {
      this.resources = new MongooseDatabase(this.mongooseConnection).resources()
    })

    it('return all resources', function () {
      expect(this.resources).to.have.lengthOf(1)
    })
  })
})
