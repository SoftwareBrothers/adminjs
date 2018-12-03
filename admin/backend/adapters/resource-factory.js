const mongoose = require('mongoose')
const MongooseResource = require('./mongoose/resource')
const BaseDecorator = require('../utils/base-decorator')
const _ = require('lodash')

/**
 * It changes raw resource object to a particular Resource implementation supported by AdminBro.
 *
 * When Decorator class is given it allso attached it to the Resource.
 * Otherwise it attaches {@link BaseDecorator}
 *
 * @param  {Object} resource            raw database resource - one of `mongoose.Model`
 * @param  {BaseDecorator} [decorator]  decorator used to decorate resource
 * @return {BaseResource}               instance of class which extends {@link BaseResource}. Right
 *                                      now only {@link MongooseResource} is supported
 *
 * @example
 * const OptionalDecorator = require('./optionalResourceDecorator')
 *
 * const database = await mongoose.connect(process.env.MONGO_URL)
 * const resources = database.models().map(m => ResourceFactory(m, OptionalDecorator))
 */
const ResourceFactory = (rawResource, decorator) => {
  if (_.get(rawResource, 'base.constructor.name') === 'Mongoose') {
    const mongooseResource = new MongooseResource(rawResource)
    mongooseResource.assignDecorator(decorator || BaseDecorator)
    return mongooseResource
  }
  throw new Error(`unsupported resource type ${rawResource.constructor ? rawResource.constructor.name : rawResource}`)
}

module.exports = ResourceFactory
