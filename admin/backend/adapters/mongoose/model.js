const AbstractModel = require('../abstract/model')
const Instance = require('./instance')
const Property = require('./property')

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
    return raw.map(m => new Instance(m))
  }

  name() {
    return this.model.modelName
  }

  properties() {
    const properties = []
    for (const [name, path] of Object.entries(this.model.schema.paths)) {
      const prop = new Property(name, path)
      properties.push(prop)
    }
    return properties
  }

  property(name) {
    return new Property(name, this.model.schema.paths[name])
  }
}

module.exports = Model
