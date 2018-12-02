const BaseResource = require('../base/resource')
const Record = require('../base/record')
const Property = require('./property')
const ValidationError = require('../../utils/validation-error')

/**
 * Adapter for mongoose resource
 */
class Resource extends BaseResource {
  constructor(MongooseModel) {
    super(MongooseModel)
    this.MongooseModel = MongooseModel
  }

  databaseName() {
    return this.MongooseModel.db.name
  }

  async count() {
    return this.MongooseModel.countDocuments()
  }

  async find(query, { limit = 20, offset = 0 }) {
    const raw = await this.MongooseModel.find({}).skip(offset).limit(limit)
    return raw.map(m => new Record(m.toObject(), this))
  }

  async findOne(id) {
    const raw = await this.MongooseModel.findById(id)
    return new Record(raw.toObject(), this)
  }

  build(params) {
    return new Record(params, this)
  }

  async create(params) {
    let mongooseDocument = new this.MongooseModel(params)
    try {
      mongooseDocument = await mongooseDocument.save()
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw this.createValidationError(error)
      }
      throw error
    }
    return mongooseDocument.toObject()
  }

  async update(id, params) {
    try {
      const ret = await this.MongooseModel.findOneAndUpdate({
        _id: id,
      }, {
        $set: params,
      }, {
        runValidators: true,
      })
      return ret
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw this.createValidationError(error)
      }
      throw error
    }
  }

  async delete(id) {
    return this.MongooseModel.deleteOne({ _id: id })
  }

  name() {
    return this.MongooseModel.modelName
  }

  id() {
    return this.MongooseModel.modelName.toLowerCase()
  }

  properties() {
    const properties = []
    for (const [name, path] of Object.entries(this.MongooseModel.schema.paths)) {
      const prop = new Property(path)
      properties.push(prop)
    }
    return properties
  }

  property(name) {
    if (this.MongooseModel.schema.paths[name]) {
      return new Property(this.MongooseModel.schema.paths[name])
    }
    return null
  }

  createValidationError(originalError) {
    const errors = Object.keys(originalError.errors).reduce((m, key) => {
      const error = originalError.errors[key]
      m[error.path] = {
        message: error.message,
        kind: error.kind,
      }
      return m
    }, {})
    return new ValidationError(`${this.name()} validation failed`, errors)
  }
}

module.exports = Resource
