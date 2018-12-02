const mongoose = require('mongoose')
const Resource = require('@backend/adapters/mongoose/resource')
const Record   = require('@backend/adapters/base/record')
const Property = require('@backend/adapters/mongoose/property')
const originalValidationError = require('@fixtures/mongoose-validation-error')
const ValidationError = require('@backend/utils/validation-error')

describe('Resource', function () {
  before(async function () {
    factory.define('user', User, {
      email: factory.sequence('User.email', n => `john@doe${n}.com`),
      passwordHash: 'somehashedpassword',
    })

    this.mongooseConnection = await mongoose.connect(process.env.MONGO_URL)
    this.count = 12
    this.userRecords = await factory.createMany('user', this.count)
  })

  after(async function () {
    await User.deleteMany({})
    mongoose.connection.close()
  })

  describe('#CreateValidationError', function () {
    beforeEach(function () {
      const resource = new Resource(User)
      this.error = resource.createValidationError(originalValidationError)
    })

    it('has errors', function () {
      expect(Object.keys(this.error.errors)).to.have.lengthOf(2)
    })

    it('has error for email', function () {
      expect(this.error.errors.email.kind).to.equal('required')
    })
  })

  describe('#constructor', function () {
    it('stores original model', function () {
      const resource = new Resource(User)
      expect(resource.MongooseModel).to.equal(User)
    })
  })

  describe('#count', function () {
    beforeEach(function () {
      this.resource = new Resource(User)
    })

    it('returns given count', async function () {
      expect(await this.resource.count()).to.equal(this.count)
    })
  })

  describe('#find', function () {
    beforeEach(async function () {
      this.resource = new Resource(User)
      this.limit = 5
      this.offset = 0
      this.ret = await this.resource.find({}, {
        limit: this.limit,
        offset: this.offset,
      })
    })

    it('returns first n items', async function () {
      expect(this.ret.length).to.equal(this.limit)
    })

    it('returns elements of Record', async function () {
      expect(this.ret[0]).to.be.an.instanceof(Record)
    })
  })

  describe('#name', function () {
    it('returns name of the model', function () {
      this.resource = new Resource(User)
      expect(this.resource.name()).to.equal('User')
    })
  })

  describe('#properties', function () {
    beforeEach(function () {
      this.resource = new Resource(User)
      this.ret = this.resource.properties()
    })

    it('returns correct amount of properties', function () {
      // 4 because of implicite _id and __v properties
      expect(this.ret).to.have.lengthOf(4)
    })

    it('returns elements of Property', async function () {
      expect(this.ret[0]).to.be.an.instanceof(Property)
    })

    context('Nested properties', function () {
      beforeEach(function () {
        const Nested = mongoose.model('Nested', new mongoose.Schema({
          field: {
            subfield: String,
            anotherSubField: String,
          },
        }))
        this.resource = new Resource(Nested)
        this.ret = this.resource.properties()
      })

      it('returns all fields', function () {
        expect(this.ret).to.have.lengthOf(4)
      })
    })
  })

  describe('#property', function () {
    beforeEach(function () {
      this.resource = new Resource(User)
      this.ret = this.resource.property('email')
    })

    it('returns selected property for an email', function () {
      expect(this.ret.name()).to.equal('email')
    })

    it('returns instance of Property class', function () {
      expect(this.ret).to.be.an.instanceof(Property)
    })
  })

  describe('#create', function () {
    context('correct record', function () {
      beforeEach(async function () {
        this.params = { email: 'john@doe.com', passwordHash: 'somesecretpasswordhash' }
        this.resource = new Resource(User)
        this.record = await this.resource.create(this.params)
      })

      it('creates new object', async function () {
        expect(await this.resource.count()).to.equal(this.count + 1)
      })

      it('returns Object', function () {
        expect(this.record).to.be.an.instanceof(Object)
      })
    })

    context('record with errors', function () {
      beforeEach(async function () {
        this.params = { email: '', passwordHash: '' }
        this.resource = new Resource(User)
      })

      it('throws validation error', async function () {
        try {
          await this.resource.create(this.params)
        } catch (error) {
          expect(error).to.be.an.instanceOf(ValidationError)
        }
      })
    })
  })

  describe('#delete', function () {
    beforeEach(async function () {
      this.startCount = await User.countDocuments()
      this.idOfItemToDelete = this.userRecords[0]._id
      this.resource = new Resource(User)
      await this.resource.delete(this.idOfItemToDelete)
    })

    it('removes the item from the database', async function () {
      expect(await User.countDocuments()).to.equal(this.startCount - 1)
    })
  })
})
