const mongoose = require('mongoose')
const Property = require('@backend/adapters/mongoose/property')

describe('Property', function () {
  describe('#name', function () {
    beforeEach(function () {
      this.schema = new mongoose.Schema({
        email: String,
        passwordHash: String,
      })
    })

    it('returns correct name', function () {
      this.property = new Property(this.schema.paths.email)
      expect(this.property.name()).to.equal('email')
    })
  })

  describe('#isVisible', function () {
    beforeEach(function () {
      this.schema = new mongoose.Schema({ __v: String })
    })

    it('hides __v field', function () {
      this.property = new Property(this.schema.paths.__v)
      expect(this.property.isVisible()).to.equal(false)
    })
  })

  describe('#isEditable', function () {
    beforeEach(function () {
      this.schema = new mongoose.Schema({ email: String })
    })

    it('prevents _id from being edited', function () {
      this.property = new Property(this.schema.paths._id)
      expect(this.property.isEditable()).to.equal(false)
    })
  })

  describe('#type', function () {
    it('returns string type', function () {
      this.schema = new mongoose.Schema({ field: String })
      this.property = new Property(this.schema.paths.field)
      expect(this.property.type()).to.equal('string')
    })

    it('returns number type', function () {
      this.schema = new mongoose.Schema({ field: Number })
      this.property = new Property(this.schema.paths.field)
      expect(this.property.type()).to.equal('number')
    })

    it('returns date type', function () {
      this.schema = new mongoose.Schema({ field: Date })
      this.property = new Property(this.schema.paths.field)
      expect(this.property.type()).to.equal('date')
    })

    it('returns boolean type', function () {
      this.schema = new mongoose.Schema({ field: Boolean })
      this.property = new Property(this.schema.paths.field)
      expect(this.property.type()).to.equal('boolean')
    })

    it('returns string type for objectId', function () {
      this.schema = new mongoose.Schema({ field: Boolean })
      this.property = new Property(this.schema.paths._id)
      expect(this.property.type()).to.equal('string')
    })

    it('returns float type for decimal', function () {
      this.schema = new mongoose.Schema({
        field: mongoose.Schema.Types.Decimal128,
      })
      this.property = new Property(this.schema.paths.field)
      expect(this.property.type()).to.equal('float')
    })
  })
})
