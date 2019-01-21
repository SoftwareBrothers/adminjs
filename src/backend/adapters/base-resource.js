/* eslint class-methods-use-this: 0 no-unused-vars: 0 */

const NotImplementedError = require('../utils/not-implemented-error')
const BaseRecord = require('./base-record')
const BaseDecorator = require('../utils/base-decorator')

/**
 * Representation of a ORM Resource in AdminBro. Visally resource is a list item in the sidebar.
 * Each resource has many records and many properties.
 *
 * Analogy is REST resource.
 *
 * @mermaid
 *   graph TD
 *   A[BaseDatabase] -->|has many| B(BaseResource)
 *   B --> |has many|C(BaseRecord)
 *   B --> |has many|D(BasePorperty)
 *
 */
class BaseResource {
  /**
   * Checks if given adapter supports resource provided by the user
   *
   * @param  {any}  rawResource resource provided in AdminBroOptions#resources array
   * @return {Boolean}          if given adapter supports this resource - returns true
   */
  static isAdapterFor(rawResource) {
    throw new NotImplementedError('BaseResource.isAdapterFor')
  }

  /**
   * The name of the database to which resource belongs. When resource is
   * a mongoose model it should be database name of the mongo database.
   *
   * Visuall, by default, all resources are nested in sidebar under their database names.
   * @return {String}         database name
   */
  databaseName() {
    throw new NotImplementedError('BaseResource#databaseName')
  }

  /**
   * Returns type of the database. It is used to compute sidebar icon for
   * given resource. Default: 'database'
   * @return {String}
   */
  databaseType() {
    return 'database'
  }

  /**
   * Return name of the resource.
   * It could be a table name in SQL database, or collection name in mongoDB.
   *
   * Visually it will be shown as the name of the resource in the UI.
   * @return {String}
   */
  name() {
    throw new NotImplementedError('BaseResource#name')
  }


  /**
   * Each resource has to have uniq id which will be put to an URL of AdminBro routes.
   * For instance in {@link Router} path for the `new` form is `/resources/{resourceId}/new`
   * @return {String} uniq resource id
   */
  id() {
    throw new NotImplementedError('BaseResource#id')
  }

  /**
   * returns array of all properties which belongs to resource
   * @return {BaseProperty[]}
   */
  properties() {
    throw new NotImplementedError('BaseResource#properties')
  }

  /**
   * returns property object for given field
   * @param {String} path           path/name of the property. Take a look at
   *                                {@link BaseProperty} to learn more about
   *                                property paths.
   * @return {BaseProperty}
   */
  property(path) {
    throw new NotImplementedError('BaseResource#property')
  }

  /**
   * Returns number of elements for given resource by including filters
   * @param  {Object} filters what data should be included
   * @return {Number}
   */
  async count(filters) {
    throw new NotImplementedError('BaseResource#count')
  }

  /**
   * Returns actual records for given resource
   * @param  {Object} filters                        what data should be included
   * @param  {Object | String} [filters.fieldName]   when filter for given field should be treaten
   *                                                 as a String it contains query as a String
   * @param  {String} [filters.fieldName.from]       for date filters it contains optional
   *                                                 from and to parameters which are String
   * @param  {String} [filters.fieldName.to]
   *
   * @example
   * // filters example
   * {
   *    name: 'Tom',
   *    createdAt: { from: '2019-01-01', to: '2019-01-18' }
   * }
   *
   * @param  {Object} options
   * @param  {Number} options.limit                  how many records should be taken
   * @param  {Number} options.offset                 offset
   * @param  {Number} options.sort                   sort
   * @param  {Number} options.sort.sortBy            sortable field
   * @param  {Number} options.sort.direction         either asc or desc
   * @return {BaseRecord[]}                          list of records
   */
  async find(filters, { limit = 20, offset = 0, sort = {} }) {
    throw new NotImplementedError('BaseResource#find')
  }

  /**
   * Finds one Record in the Resource by its id
   * @param  {String} id      uniq id of the Resource Record
   * @return {BaseRecord}   record
   */
  async findOne(id) {
    throw new NotImplementedError('BaseResource#findOne')
  }

  /**
   * Builds new Record of given Resource.
   *
   * Each Record is an representation of the resource item. Before it can be saved,
   * it has to be instantiated.
   *
   * @param  {Object} params
   * @return {BaseRecord}
   */
  async build(params) {
    return new BaseRecord(params, this)
  }

  /**
   * Creates new record
   * @param  {Object} params
   * @return {Object}                  created record converted to raw Object which
   *                                   can be used to initiate new {@link BaseRecord} instance
   * @throws {ValidationError} If there are validation errors it should be thrown
   */
  async create(params) {
    throw new NotImplementedError('BaseResource#create')
  }

  /**
   * Updates an object
   * @param  {String} id      uniq id of the Resource Record
   * @param  {Object} params
   * @return {Object}                  created record converted to raw Object which
   *                                   can be used to initiate new {@link BaseRecord} instance
   * @throws {ValidationError} If there are validation errors it should be thrown
   */
  async update(id, params) {
    throw new NotImplementedError('BaseResource#update')
  }

  /**
   * Delete given record by id
   * @param  {String|Number} id id of the Record
   */
  async delete(id) {
    throw new NotImplementedError('BaseResource#delete')
  }

  /**
   * Assigns {@link BaseDecorator} to the Resource. Than it will be available under
   * resource.decorate() method
   * @param  {Object}         options       custom resource options defined by User
   * @param  {AdminBro}       admin         current instance of AdminBro
   */
  assignDecorator(options, admin) {
    this._decorated = new BaseDecorator({ resource: this, admin, options })
  }

  /**
   * Gets decorator object for given resource
   * @return {BaseDecorator | null}
   */
  decorate() {
    return this._decorated
  }
}

module.exports = BaseResource
