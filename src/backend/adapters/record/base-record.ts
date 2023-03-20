import { flat, GetOptions } from '../../../utils/flat/index.js'
import { ParamsType } from './params.type.js'
import BaseResource from '../resource/base-resource.js'
import ValidationError, { PropertyErrors } from '../../utils/errors/validation-error.js'
import RecordError from '../../utils/errors/record-error.js'
import { RecordJSON } from '../../../frontend/interfaces/index.js'
import { CurrentAdmin } from '../../../current-admin.interface.js'
import { ActionContext } from '../../actions/index.js'

/**
 * Representation of an particular ORM/ODM Record in given Resource in AdminJS
 *
 * @category Base
 */
class BaseRecord {
  /**
   * Resource to which record belongs
   */
  public resource: BaseResource

  /**
   * Actual record data stored as a flatten object. You shouldn't access them directly - always
   * with {@link BaseRecord#get} and {@link BaseRecord#set} property.
   */
  public params: ParamsType

  /**
   * Object containing any base/overall validation error messages:
   * this.baseError = { message: 'errorMessage' }
   */
  public baseError: RecordError | null

  /**
   * Object containing all validation errors: this.errors[path] = { message: 'errorMessage' }
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
    this.baseError = null
    this.errors = {}
    this.populated = {}
  }

  /**
   * Returns value for given field.
   * @param  {string} path      path (name) for given field: i.e. 'email' or 'authentication.email'
   *                            if email is nested within the authentication object in the data
   *                            store
   * @return {any}              value for given field
   * @deprecated in favour of {@link BaseRecord#get} and {@link BaseRecord#set} methods
   */
  param(path: string): any {
    return flat.get(this.params, path)
  }

  /**
   * Returns unflatten (regular) value for given field. So if you have in the params following
   * structure:
   * ```javascript
   * params = {
   *   genre.0: 'male',
   *   genre.1: 'female',
   * }
   * ```
   *
   * for `get('genre')` function will return ['male', 'female']
   *
   * @param {string} [propertyPath]     path for the property. If not set function returns an entire
   *                                    unflatten object
   * @param {GetOptions} [options]
   * @return {any}                      unflatten data under given path
   * @new in version 3.3
   */
  get(propertyPath?: string, options?: GetOptions): any {
    return flat.get(this.params, propertyPath, options)
  }

  /**
   * Sets given value under the propertyPath. Value is flatten and all previous values under this
   * path are replaced. When value is `undefined` function just clears the old values
   *
   * @param {string}    propertyPath
   * @param {any}       value
   * @returns           an entire, updated, params object
   * @new in version 3.3
   */
  set(propertyPath: string, value: any): any {
    this.params = flat.set(this.params, propertyPath, value)
    return this.params
  }

  /**
   * Returns object containing all params keys starting with prefix
   *
   * @param   {string}  prefix
   *
   * @return  {object | undefined}
   * @deprecated in favour of {@link selectParams}
   */
  namespaceParams(prefix: string): Record<string, any> | void {
    return flat.selectParams(this.params, prefix)
  }

  /**
   * Returns object containing all params keys starting with prefix
   *
   * @param   {string}  prefix
   * @param {GetOptions} [options]
   *
   * @return  {object | undefined}
   * @new in version 3.3
   */
  selectParams(prefix: string, options?: GetOptions): Record<string, any> | void {
    return flat.selectParams(this.params, prefix, options)
  }

  /**
   * Updates given Record in the data store. Practically it invokes
   * {@link BaseResource.update} method.
   *
   * When validation error occurs it stores that to {@link BaseResource.errors}
   *
   * @param  {object} params all field with values which has to be updated
   * @param  {ActionContext}           [context]
   * @return {Promise<BaseRecord>}        given record (this)
   */
  async update(params, context?: ActionContext): Promise<BaseRecord> {
    try {
      this.storeParams(params)
      const returnedParams = await this.resource.update(this.id(), params, context)
      this.storeParams(returnedParams)
    } catch (e) {
      if (e instanceof ValidationError) {
        this.baseError = e.baseError
        this.errors = e.propertyErrors
        return this
      }
      throw e
    }
    this.baseError = null
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
   * @param  {ActionContext}           [context]
   * @return {Promise<BaseRecord>}        given record (this)
   */
  async save(context?: ActionContext): Promise<BaseRecord> {
    try {
      let returnedParams
      if (this.id()) {
        returnedParams = await this.resource.update(this.id(), this.params, context)
      } else {
        returnedParams = await this.resource.create(this.params, context)
      }
      this.storeParams(returnedParams)
    } catch (e) {
      if (e instanceof ValidationError) {
        this.baseError = e.baseError
        this.errors = e.propertyErrors
        return this
      }
      throw e
    }
    this.baseError = null
    this.errors = {}
    return this
  }

  /**
   * Creates the record in the database
   *
   * Practically it invokes
   * {@link BaseResource#create}.
   *
   * When validation error occurs it stores that to {@link BaseResource#errors}
   *
   *
   * @return {Promise<BaseRecord>}        given record (this)
   * @param  {ActionContext}           [context]
   */
  async create(context?: ActionContext): Promise<BaseRecord> {
    try {
      const returnedParams = await this.resource.create(this.params, context)
      this.storeParams(returnedParams)
    } catch (e) {
      if (e instanceof ValidationError) {
        this.baseError = e.baseError
        this.errors = e.propertyErrors
        return this
      }
      throw e
    }
    this.baseError = null
    this.errors = {}
    return this
  }

  /**
   * Returns uniq id of the Record.
   * @return {string | number} id of the Record
   */
  id(): string {
    const idProperty = this.resource.properties().find((p) => p.isId())
    if (!idProperty) {
      throw new Error(`Resource: "${this.resource.id()}" does not have an id property`)
    }
    return this.params[idProperty.name()]
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
    const nameProperty = this.resource.properties().find((p) => p.isTitle())
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
   * @param   {string}  propertyPath           name of the property which should be populated
   * @param   {BaseRecord | null}  [record]    record to which property relates. If record is null
   *                                           or undefined - function clears the previous value
   */
  populate(propertyPath: string, record?: BaseRecord | null): void {
    if (record === null || typeof record === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [propertyPath]: oldValue, ...rest } = this.populated
      this.populated = rest
    } else {
      this.populated[propertyPath] = record
    }
  }

  /**
   * Returns JSON representation of an record
   * @param {CurrentAdmin} [currentAdmin]
   * @return  {RecordJSON}
   */
  toJSON(currentAdmin?: CurrentAdmin): RecordJSON {
    const populated = Object.keys(this.populated).reduce((m, key) => {
      // sometimes user can add some arbitrary element to populated object. In such case
      // we should omit toJSON call.
      if ((this.populated[key] as any).toJSON) {
        m[key] = this.populated[key].toJSON(currentAdmin)
      } else {
        m[key] = this.populated[key]
      }

      return m
    }, {})
    return {
      params: this.params,
      populated,
      baseError: this.baseError,
      errors: this.errors,
      id: this.id(),
      title: this.resource.decorate().titleOf(this),
      recordActions: this.resource.decorate().recordActions(this, currentAdmin)
        .map((recordAction) => recordAction.toJSON(currentAdmin)),
      bulkActions: this.resource.decorate().bulkActions(this, currentAdmin)
        .map((recordAction) => recordAction.toJSON(currentAdmin)),
    }
  }

  /**
   * Stores incoming payloadData in record params
   *
   * @param {object} [payloadData]
   */
  storeParams(payloadData?: object): void {
    this.params = flat.merge(this.params, payloadData)
  }
}

export default BaseRecord
