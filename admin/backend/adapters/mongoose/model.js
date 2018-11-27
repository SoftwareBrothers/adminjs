const AbstractModel = require('../abstract/model')
const Instance = require('./instance')
const Property = require('./property')
const ValidationError = require('../../utils/validation-error')

/**
 * Adapter for mongoose model
 */
class Model extends AbstractModel {
  /**
   * Return all available models for given connection
   * @param  {Object} mongooseConnection    mongoose connection object
   * @return {Model[]}                      list of all models in given mongo database
   *
   * @example
   * const mongoose = require('mongoose')
   *
   * const connection = await mongoose.connect(process.env.MONGO_URL)
   * Model.all(connection)
   */
  static all(mongooseConnection) {
    return mongooseConnection.modelNames().map(name => Model.find(mongooseConnection, name))
  }

  /**
   * Return Model object for given collection name
   * @param  {Object} mongooseConnection    mongoose connection object
   * @param  {String} name                  name of mongoose model
   * @return {Model}                        model adapter for given mongodb model
   *
   * @example
   * const mongoose = require('mongoose')
   *
   * const connection = await mongoose.connect(process.env.MONGO_URL)
   * Model.all(connection)
   */
  static find(mongooseConnection, name) {
    const mongoModel = mongooseConnection.model(name)
    return new Model(mongoModel)
  }

  constructor(mongoModel) {
    super(mongoModel)
    this.model = mongoModel
  }

  async count() {
    return this.model.countDocuments()
  }

  async find(query, { limit = 20, offset = 0 }) {
    const raw = await this.model.find({}).skip(offset).limit(limit)
    return raw.map(m => new Instance(m.toObject(), this))
  }

  async findOne(id) {
    const raw = await this.model.findById(id)
    return new Instance(raw.toObject(), this)
  }

  build(params) {
    return new Instance(params, this)
  }

  async create(params) {
    let mongooseDocument = new this.model(params)
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
    let raw
    const mongooseDocument = await this.model.findById(id)
    try {
      mongooseDocument.set(params)
      raw = await mongooseDocument.save()
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw this.createValidationError(error)
      }
      throw error
    }
    return raw.toObject()
  }

  async delete(id) {
    return this.model.deleteOne({ _id: id })
  }

  name() {
    return this.model.modelName
  }

  properties() {
    const properties = []
    for (const [name, path] of Object.entries(this.model.schema.paths)) {
      const prop = new Property(path)
      properties.push(prop)
    }
    return properties
  }

  property(name) {
    return new Property(this.model.schema.paths[name])
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

module.exports = Model
