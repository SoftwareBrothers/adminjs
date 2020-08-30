import * as flat from 'flat'
import _ from 'lodash'
import BaseResource from './base-resource'
import ValidationError, { RecordError, PropertyErrors } from '../utils/validation-error'
import RecordJSON from '../decorators/record-json.interface'
import { CurrentAdmin } from '../../current-admin.interface'

/**
 * @alias ParamsType
 * @memberof BaseRecord
 */
export type ParamsType = Record<string, any>

/**
 * Representation of an particular ORM/ODM Record in given Resource in AdminBro
 *
 * @category Base
 */
class BaseRecord {
  /**
   * Resource to which record belongs
   */
  public resource: BaseResource

  /**
   * Actual record data stored as a flatten object
   */
  public params: ParamsType

  /**
   * Object containing all validation errors: this.errors[path] = 'errorMessage'
   */
  public errors: PropertyErrors

  /**
   * Object containing all populated relations.
   */
  public populated: {[key: string]: BaseRecord}

  /**
   * @param  {ParamsType}   params         all resource data. I.e. field values
   * @param  {BaseResource} resource       resource to which given record belongs
   */
  constructor(params: ParamsType, resource: BaseResource) {
    this.resource = resource
    this.params = params ? flat.flatten(params) : {}
    this.errors = {}
    this.populated = {}
  }

  /**
   * Returns value for given field.
   * @param  {string} path      path (name) for given field: i.e. 'email' or 'authentication.email'
   *                            if email is nested within the authentication object in the data
   *                            store
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
   * @param   {string}  prefix
   *
   * @return  {object | undefined}
   */
  namespaceParams(prefix: string): Record<string, any> | void {
    const regex = new RegExp(`^${prefix}`)
    const keys = Object.keys(this.params).filter(key => key.match(regex))
    if (keys.length) {
      return keys.reduce((memo, key) => ({ ...memo, [key]: this.params[key] }), {})
    }
    return undefined
  }

  /**
   * Updates given Record in the data store. Practically it invokes
   * {@link BaseResource.update} method.
   *
   * When validation error occurs it stores that to {@link BaseResource.errors}
   *
   * @param  {object} params all field with values which has to be updated
   * @return {Promise<BaseRecord>}        given record (this)
   */
  async update(params): Promise<BaseRecord> {
    try {
      this.storeParams(params)
      this.params = await this.resource.update(this.id(), params)
    } catch (e) {
      if (e instanceof ValidationError) {
        this.errors = e.propertyErrors
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
   * When validation error occurs it stores that to {@link BaseResource#errors}
   *
   * @return {Promise<BaseRecord>}        given record (this)
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
        this.errors = e.propertyErrors
        return this
      }
      throw e
    }
    this.errors = {}
    return this
  }


  /**
   * Returns uniq id of the Record.
   * @return {string | number} id of the Record
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
   * @return {string} title of the record
   */
  title(): string {
    const nameProperty = this.resource.properties().find(p => p.isTitle())
    return nameProperty ? this.param(nameProperty.name()) : this.id()
  }

  /**
   * Return state of validation for given record
   * @return {boolean} if record is valid or not.
   */
  isValid(): boolean {
    return Object.keys(this.errors).length === 0
  }

  /**
   * Returns error message for given property path (name)
   * @param  {string} path        (name) of property which we want to check if is valid
   * @return {RecordError | null}      validation message of null
   */
  error(path: string): RecordError | null {
    return this.errors[path]
  }

  /**
   * Populate record relations
   *
   * @param   {string}  propertyName  name of the property which should be populated
   * @param   {BaseRecord}  record    record to which property relates
   */
  populate(propertyName: string, record: BaseRecord): void {
    this.populated[propertyName] = record
  }

  /**
   * Returns JSON representation of an record
   * @param {CurrentAdmin} [currentAdmin]
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
      ).map(recordAction => recordAction.toJSON(currentAdmin)),
      bulkActions: this.resource.decorate().bulkActions(
        this, currentAdmin,
      ).map(recordAction => recordAction.toJSON(currentAdmin)),
    }
  }

  /**
   * Stores incoming payloadData in record params
   *
   * @param {object} [payloadData]
   */
  storeParams(payloadData?: object): void {
    this.params = _.merge(this.params, payloadData ? flat.flatten(payloadData) : {})
  }
}

export default BaseRecord
