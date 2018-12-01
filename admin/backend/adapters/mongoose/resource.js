const BaseResource = require('../base/resource')
const Instance = require('../base/instance')
const Property = require('./property')
const ValidationError = require('../../utils/validation-error')

/**
 * Adapter for mongoose resource
 */
class Resource extends BaseResource {
  databaseName() {
    return this.resource.db.name
  }

  constructor(mongoModel) {
    super(mongoModel)
    this.resource = mongoModel
  }

  async count() {
    return this.resource.countDocuments()
  }

  async find(query, { limit = 20, offset = 0 }) {
    const raw = await this.resource.find({}).skip(offset).limit(limit)
    return raw.map(m => new Instance(m.toObject(), this))
  }

  async findOne(id) {
    const raw = await this.resource.findById(id)
    return new Instance(raw.toObject(), this)
  }

  build(params) {
    return new Instance(params, this)
  }

  async create(params) {
    let mongooseDocument = new this.resource(params)
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
      const ret = await this.resource.findOneAndUpdate({
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
    return this.resource.deleteOne({ _id: id })
  }

  name() {
    return this.resource.modelName
  }

  id() {
    return this.resource.modelName.toLowerCase()
  }

  properties() {
    const properties = []
    for (const [name, path] of Object.entries(this.resource.schema.paths)) {
      const prop = new Property(path)
      properties.push(prop)
    }
    return properties
  }

  property(name) {
    if (this.resource.schema.paths[name]) {
      return new Property(this.resource.schema.paths[name])
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
