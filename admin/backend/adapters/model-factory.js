const mongoose = require('mongoose')
const MongooseModel = require('./mongoose/model')
const BaseDecorator = require('../utils/base-decorator')

/**
 * It changes raw model object to instance which inherits from {@link AbstractModel}
 *
 * @param  {Object} model               raw database model
 * @param  {BaseDecorator} [decorator]  decorator used to decorate model
 * @return {AbstractModel}              instance of class which extends {@link AbstractModel}. Right
 *                                      now only {@link MongooseModel} is supported
 */
const ModelFactory = (rawModel, decorator) => {
  if (rawModel.prototype instanceof mongoose.Model) {
    const mongooseModel = new MongooseModel(rawModel)
    mongooseModel.assignDecorator(decorator || BaseDecorator)
    return mongooseModel
  }
  throw new Error(`unsupported model type ${model.constructor ? model.constructor.name : model}`)
}

module.exports = ModelFactory
