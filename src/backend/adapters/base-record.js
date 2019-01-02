const flatten = require('flat')
const _ = require('lodash')
const ValidationError = require('../utils/validation-error')

/**
 * Representation of an particular ORM Record in given Resource in AdminBro
 *
 * @mermaid
 *   graph TD
 *   A[BaseDatabase] -->|has many| B(BaseResource)
 *   B --> |has many|C(BaseRecord)
 *   B --> |has many|D(BasePorperty)
 */
class BaseRecord {
  /**
   * @param  {Object}       params         all resource data. I.e. field values
   * @param  {BaseResource} resource       resource to which given record belongs
   */
  constructor(params, resource) {
    /**
     * Resource to which record belongs
     * @type {BaseResource}
     */
    this.resource = resource

    /**
     * Actual record data stored as a flatten object
     * @type {Object}
     */
    this.params = params ? flatten(params) : {}

    /**
     * Object containing all validation errors: this.errors[path] = 'errorMessage'
     * @type {Object}
     */
    this.errors = {}
  }

  /**
   * Returns value for given field
   * @param  {String} path      path (name) for given field: i.e. 'email' or 'authentication.email'
   *                            if email is nested within the authentication object in the datastore
   * @return {any}              value for given field
   */

  param(path) {
    return this.params && this.params[path]
  }


  /**
   * Updates given Record in the datastore. Practically it invokes
   * {@link BaseResource.update} method.
   *
   * When validation error occures it stores that to {@link BaseResource.errors}
   *
   * @param  {Object} params all field with values which has to be updated
   * @return {BaseRecord}        given record (this)
   */
  async update(params) {
    try {
      this.params = await this.resource.update(this.id(), params)
    } catch (e) {
      if (e instanceof ValidationError) {
        this.errors = e.errors
        this.storeParams(params)
        return this
      }
      throw e
    }
    this.errors = {}
    return this
  }

  /**
   * Saves the record in the database. When record already exists - it updates, otherwise
   * it creates new one.
   *
   * Practically it invokes
   * {@link BaseResource#create} or {@link BaseResource#update} methods.
   *
   * When validation error occures it stores that to {@link BaseResource#errors}
   *
   * @return {BaseRecord}        given record (this)
   */
  async save() {
    try {
      if (this.id()) {
        this.params = await this.resource.update(this.id(), this.params)
      } else {
        this.params = await this.resource.create(this.params)
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        this.errors = e.errors
        return this
      }
      throw e
    }
    this.errors = {}
    return this
  }


  /**
   * Returns uniq id of the Record.
   * @return {String | Number} id of the Record
   */
  id() {
    const idProperty = this.resource.properties().find(p => p.isId())
    return this.param(idProperty.name())
  }

  /**
   * Returns title of the record. Usually title is an value for fields like: email, topic,
   * title etc.
   *
   * Title will be shown in the breadcrumbs for example.
   *
   * @return {String} title of the record
   */
  title() {
    const nameProperty = this.resource.properties().find(p => p.isTitle())
    return nameProperty ? this.param(nameProperty.name()) : this.id()
  }

  /**
   * Return state of validation for given record
   * @return {Boolean} if record is valid or not.
   */
  isValid() {
    return Object.keys(this.errors).length === 0
  }

  /**
   * Stores incoming payloadData in record params
   */
  storeParams(payloadData) {
    this.params = _.merge(this.params, payloadData)
  }

  /**
   * Returns error message for given property path (name)
   * @param  {String} path path (name) of property which we want to check if is valid
   * @return {String | null}      validation message of null
   */
  error(path) {
    return this.errors[path]
  }
}

module.exports = BaseRecord
