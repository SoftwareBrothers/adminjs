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
    return raw.map(m => new Instance(m, this))
  }

  async findOne(id) {
    const raw = await this.model.findById(id)
    return new Instance(raw, this)
  }

  async create(params) {
    let instance = new this.model(params)
    instance = await instance.save()
    return new Instance(instance, this)
  }

  async update(id, params) {
    const raw = await this.model.findOneAndUpdate({ _id: id }, params)
    return new Instance(raw, this)
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
}

module.exports = Model
