const NotImplementedError = require('../../utils/not-implemented-error')

/**
 * Representation of a ORM Resource in AdminBro
 */
class BaseResource {
  /**
   * Return name of the resource
   * @return {String}
   */
  name() {
    throw new NotImplementedError()
  }

  /**
   * returns array of properties
   * @return {AbstractProperty[]}
   */
  properties() {
    throw new NotImplementedError()
  }

  /**
   * returns property object for given field
   * @return {AbstractProperty}
   */
  property(name) {
    throw new NotImplementedError()
  }

  /**
   * Returns number of elements for given resource
   * @return {Number}
   */
  count() {
    throw new NotImplementedError()
  }

  /**
   * Returns actual records for given resource
   * @param  {Object} where           query
   * @param  {Number} options.limit   how many records should be taken
   * @param  {Number} options.offset  offset
   * @return {Object[]}               list of all records
   */
  find(where, { limit=20, offset=0 }) {
    throw new NotImplementedError()
  }

  findOne(id) {
    throw new NotImplementedError()
  }

  /**
   * Creates new record
   * @param  {Object} params
   * @return {Object}                  created record
   */
  create(params) {
    throw new NotImplementedError()
  }

  /**
   * Delete given record by id
   * @param  {String|Number} id id of the record
   */
  delete(id) {
    throw new NotImplementedError()
  }

  databaseName() {
    throw new NotImplementedError()
  }

  assignDecorator(Decorator) {
    this._Decorator = Decorator
  }

  decorate() {
    this._decorated = this._decorated || new this._Decorator(this)
    return this._decorated
  }
}

module.exports = BaseResource
