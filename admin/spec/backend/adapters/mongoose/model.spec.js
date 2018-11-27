const mongoose = require('mongoose')
const Model = require('@backend/adapters/mongoose/model')
const Instance = require('@backend/adapters/mongoose/instance')
const Property = require('@backend/adapters/mongoose/property')
const originalValidationError = require('@fixtures/mongoose-validation-error')
const ValidationError = require('@backend/utils/validation-error')

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
})

const User = mongoose.model('User', UserSchema)

factory.define('user', User, {
  email: factory.sequence('User.email', n => `john@doe${n}.com`),
  passwordHash: 'somehashedpassword',
})

describe('Model', function () {
  before(async function () {
    this.mongooseConnection = await mongoose.connect(process.env.MONGO_URL)
    this.count = 12
    this.userInstances = await factory.createMany('user', this.count)
  })

  after(async function () {
    await User.deleteMany({})
    mongoose.connection.close()
  })

  describe('.all', function () {
    beforeEach(function () {
      this.models = Model.all(this.mongooseConnection)
    })

    it('return all models', function () {
      expect(this.models).to.have.lengthOf(1)
    })

    it('return instances of Models class', function () {
      expect(this.models[0]).to.be.an.instanceof(Model)
    })
  })

  describe('#CreateValidationError', function () {
    beforeEach(function () {
      const model = new Model(User)
      this.error = model.createValidationError(originalValidationError)
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
      const model = new Model(User)
      expect(model.model).to.equal(User)
    })
  })

  describe('#count', function () {
    beforeEach(function () {
      this.model = new Model(User)
    })

    it('returns given count', async function () {
      expect(await this.model.count()).to.equal(this.count)
    })
  })

  describe('#find', function () {
    beforeEach(async function () {
      this.model = new Model(User)
      this.limit = 5
      this.offset = 0
      this.ret = await this.model.find({}, {
        limit: this.limit,
        offset: this.offset,
      })
    })

    it('returns first n items', async function () {
      expect(this.ret.length).to.equal(this.limit)
    })

    it('returns elements of Instance', async function () {
      expect(this.ret[0]).to.be.an.instanceof(Instance)
    })
  })

  describe('#name', function () {
    it('returns name of the model', function () {
      this.model = new Model(User)
      expect(this.model.name()).to.equal('User')
    })
  })

  describe('#properties', function () {
    beforeEach(function () {
      this.model = new Model(User)
      this.ret = this.model.properties()
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
        this.model = new Model(Nested)
        this.ret = this.model.properties()
      })

      it('returns all fields', function () {
        expect(this.ret).to.have.lengthOf(4)
      })
    })
  })

  describe('#property', function () {
    beforeEach(function () {
      this.model = new Model(User)
      this.ret = this.model.property('email')
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
        this.model = new Model(User)
        this.instance = await this.model.create(this.params)
      })

      it('creates new object', async function () {
        expect(await this.model.count()).to.equal(this.count + 1)
      })

      it('returns Object', function () {
        expect(this.instance).to.be.an.instanceof(Object)
      })
    })

    context('record with errors', function () {
      beforeEach(async function () {
        this.params = { email: '', passwordHash: '' }
        this.model = new Model(User)
      })

      it('throws validation error', async function () {
        try {
          await this.model.create(this.params)
        } catch (error) {
          expect(error).to.be.an.instanceOf(ValidationError)
        }
      })
    })
  })

  describe('#delete', function () {
    beforeEach(async function () {
      this.startCount = await User.countDocuments()
      this.idOfItemToDelete = this.userInstances[0]._id
      this.model = new Model(User)
      await this.model.delete(this.idOfItemToDelete)
    })

    it('removes the item from the database', async function () {
      expect(await User.countDocuments()).to.equal(this.startCount - 1)
    })
  })
})
