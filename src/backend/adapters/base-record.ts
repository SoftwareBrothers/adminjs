import * as flat from 'flat'
import _ from 'lodash'
import BaseResource from './base-resource'
import ValidationError from '../utils/validation-error'
import RecordJSON from '../decorators/record-json.interface'
import { CurrentAdmin } from '../../current-admin.interface'

export type RecordError = {
  type: string;
  message: string;
}

export type ParamsType = Record<string, any>

/**
 * Representation of an particular ORM/ODM Record in given Resource in AdminBro
 *
 * @category Base
 */
class BaseRecord {
  public resource: BaseResource

  private params: ParamsType

  private errors: {[key: string]: RecordError}

  private populated: {[key: string]: BaseRecord}

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
    this.params = params ? flat.flatten(params) : {}

    /**
     * Object containing all validation errors: this.errors[path] = 'errorMessage'
     * @type {Object}
     */
    this.errors = {}

    /**
     * Object containing all populated relations.
     *
     * @type {Object<BaseRecord>}
     */
    this.populated = {}
  }

  /**
   * Returns value for given field.
   * @param  {String} path      path (name) for given field: i.e. 'email' or 'authentication.email'
   *                            if email is nested within the authentication object in the datastore
   * @return {any}              value for given field
   */
  param(path: string): any {
    if (this.params && this.params[path]) {
      return this.params[path]
    }
    const subParams = this.namespaceParams(path)
    if (subParams) {
      const unflattenSubParams = flat.unflatten(subParams) as Record<string, any>
      return path.split('.').reduce((m, v) => m[v], unflattenSubParams)
    }
    return undefined
  }

  /**
   * Returns object containing all params keys starting with prefix
   * @param   {String}  prefix
   *
   * @return  {Object}
   */
  namespaceParams(prefix: string): Record<string, any> {
    const regex = new RegExp(`^${prefix}`)
    const keys = Object.keys(this.params).filter(key => key.match(regex))
    if (keys.length) {
      return keys.reduce((memo, key) => ({ ...memo, [key]: this.params[key] }), {})
    }
    return {}
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
  async update(params): Promise<BaseRecord> {
    try {
      this.storeParams(params)
      this.params = await this.resource.update(this.id(), params)
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
  async save(): Promise<BaseRecord> {
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
  id(): string {
    const idProperty = this.resource.properties().find(p => p.isId())
    if (!idProperty) {
      throw new Error(`Resource: "${this.resource.id()}" does not have an id property`)
    }
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
  title(): string {
    const nameProperty = this.resource.properties().find(p => p.isTitle())
    return nameProperty ? this.param(nameProperty.name()) : this.id()
  }

  /**
   * Return state of validation for given record
   * @return {Boolean} if record is valid or not.
   */
  isValid(): boolean {
    return Object.keys(this.errors).length === 0
  }

  /**
   * Stores incoming payloadData in record params
   */
  storeParams(payloadData: object): void {
    this.params = _.merge(this.params, payloadData)
  }

  /**
   * Returns error message for given property path (name)
   * @param  {String} path path (name) of property which we want to check if is valid
   * @return {String | null}      validation message of null
   */
  error(path: string): RecordError | null {
    return this.errors[path]
  }

  /**
   * Populate record relations
   *
   * @param   {String}  propertyName  name of the property which should be populated
   * @param   {BaseRecord}  record    record to which property relates
   */
  populate(propertyName: string, record: BaseRecord): void {
    this.populated[propertyName] = record
  }

  /**
   * Returns JSON representation of an record
   * @param {CurrentAdmin} currentAdmin
   * @return  {RecordJSON}
   */
  toJSON(currentAdmin?: CurrentAdmin): RecordJSON {
    const populated = Object.keys(this.populated).reduce((m, key) => ({
      ...m,
      [key]: this.populated[key].toJSON(currentAdmin),
    }), {})
    return {
      params: this.params,
      populated,
      errors: this.errors,
      id: this.id(),
      title: this.resource.decorate().titleOf(this),
      recordActions: this.resource.decorate().recordActions(
        this, currentAdmin,
      ).map(ra => ra.toJSON()),
    }
  }
}

export default BaseRecord
