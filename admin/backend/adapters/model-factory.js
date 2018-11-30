const mongoose = require('mongoose')
const MongooseModel = require('./mongoose/model')

/**
 * It changes raw model object to instance which inherits from {@link AbstractModel}
 *
 * @param  {Object} model             raw database model
 * @return {AbstractModel}            instance of class which extends {@link AbstractModel}. Right
 *                                    now only {@link MongooseModel} is supported
 */
const ModelFactory = (model) => {
  if (model.prototype instanceof mongoose.Model) {
    return new MongooseModel(model)
  }
  throw new Error(`unsupported model type ${model.constructor ? model.constructor.name : model}`)
}

module.exports = ModelFactory
