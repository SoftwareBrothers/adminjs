const mongoose = require('mongoose')
const MongooseDatabase = require('@backend/adapters/mongoose/database')

describe('Model', function () {
  before(async function () {
    this.collectionName = 'admin-server-test'
    this.mongoose = await mongoose.connect(`mongodb://mongo/${this.collectionName}`)
  })

  after(async function () {
    mongoose.connection.close()
  })

  describe('#name', function () {
    beforeEach(function () {
      this.database = new MongooseDatabase(this.mongoose.connections[0])
    })

    it('returns correct name', function () {
      expect(this.database.name()).to.equal(this.collectionName)
    })
  })
})
