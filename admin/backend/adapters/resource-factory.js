const mongoose = require('mongoose')
const MongooseResource = require('./mongoose/resource')
const BaseDecorator = require('../utils/base-decorator')

/**
 * It changes raw resource object to a particular Resource implementation
 *
 * @param  {Object} resource               raw database resource
 * @param  {BaseDecorator} [decorator]  decorator used to decorate resource
 * @return {BaseResource}               instance of class which extends {@link BaseResource}. Right
 *                                      now only {@link MongooseResource} is supported
 */
const ResourceFactory = (rawResource, decorator) => {
  if (rawResource.prototype instanceof mongoose.Model) {
    const mongooseResource = new MongooseResource(rawResource)
    mongooseResource.assignDecorator(decorator || BaseDecorator)
    return mongooseResource
  }
  throw new Error(`unsupported resource type ${rawResource.constructor ? rawResource.constructor.name : rawResource}`)
}

module.exports = ResourceFactory
