/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint class-methods-use-this: 0 no-unused-vars: 0 */
/* eslint no-useless-constructor: 0 */
import { SupportedDatabasesType } from './supported-databases.type'
import { BaseProperty, BaseRecord, ParamsType } from '..'
import { NotImplementedError, Filter } from '../../utils'
import { ResourceOptions, ResourceDecorator } from '../../decorators'
import AdminJS from '../../../adminjs'

/**
 * Representation of a ORM Resource in AdminJS. Visually resource is a list item in the sidebar.
 * Each resource has many records and many properties.
 *
 * Analogy is REST resource.
 *
 * It is an __abstract class__ and all database adapters should implement extend it implement
 * following methods:
 *
 * - (static) {@link BaseResource.isAdapterFor isAdapterFor()}
 * - {@link BaseResource#databaseName databaseName()}
 * - {@link BaseResource#name name()}
 * - {@link BaseResource#id id()}
 * - {@link BaseResource#properties properties()}
 * - {@link BaseResource#property property()}
 * - {@link BaseResource#count count()}
 * - {@link BaseResource#find find()}
 * - {@link BaseResource#findOne findOne()}
 * - {@link BaseResource#findMany findMany()}
 * - {@link BaseResource#create create()}
 * - {@link BaseResource#update update()}
 * - {@link BaseResource#delete delete()}
 * @category Base
 * @abstract
 * @hideconstructor
 */
class BaseResource {
  public _decorated: ResourceDecorator | null

  /**
   * Checks if given adapter supports resource provided by the user.
   * This function has to be implemented only if you want to create your custom
   * database adapter.
   *
   * For one time Admin Resource creation - it is not needed.
   *
   * @param  {any}  rawResource resource provided in AdminJSOptions#resources array
   * @return {Boolean}          if given adapter supports this resource - returns true
   * @abstract
   */
  static isAdapterFor(rawResource): boolean {
    throw new NotImplementedError('BaseResource.isAdapterFor')
  }

  /**
   * Creates given resource based on the raw resource object
   *
   * @param   {Object}  [resource]
   */
  constructor(resource?: any) {
    this._decorated = null
  }

  /**
   * The name of the database to which resource belongs. When resource is
   * a mongoose model it should be database name of the mongo database.
   *
   * Visually, by default, all resources are nested in sidebar under their database names.
   * @return {String}         database name
   * @abstract
   */
  databaseName(): string {
    throw new NotImplementedError('BaseResource#databaseName')
  }

  /**
   * Returns type of the database. It is used to compute sidebar icon for
   * given resource. Default: 'database'
   * @return {String}
   */
  databaseType(): SupportedDatabasesType | string {
    return 'other'
  }

  /**
   * Each resource has to have uniq id which will be put to an URL of AdminJS routes.
   * For instance in {@link Router} path for the `new` form is `/resources/{resourceId}/new`
   * @return {String} uniq resource id
   * @abstract
   */
  id(): string {
    throw new NotImplementedError('BaseResource#id')
  }

  /**
   * returns array of all properties which belongs to resource
   * @return {BaseProperty[]}
   * @abstract
   */
  properties(): Array<BaseProperty> {
    throw new NotImplementedError('BaseResource#properties')
  }

  /**
   * returns property object for given field
   * @param {String} path           path/name of the property. Take a look at
   *                                {@link BaseProperty} to learn more about
   *                                property paths.
   * @return {BaseProperty | null}
   * @abstract
   */
  property(path: string): BaseProperty | null {
    throw new NotImplementedError('BaseResource#property')
  }

  /**
   * Returns number of elements for given resource by including filters
   * @param  {Filter} filter        represents what data should be included
   * @return {Promise<Number>}
   * @abstract
   */
  async count(filter: Filter): Promise<number> {
    throw new NotImplementedError('BaseResource#count')
  }

  /**
   * Returns actual records for given resource
   *
   * @param  {Filter} filters                        what data should be included
   * @param  {Object} options
   * @param  {Number} [options.limit]                  how many records should be taken
   * @param  {Number} [options.offset]                 offset
   * @param  {Object} [options.sort]                   sort
   * @param  {Number} [options.sort.sortBy]            sortable field
   * @param  {Number} [options.sort.direction]         either asc or desc
   * @return {Promise<BaseRecord[]>}                          list of records
   * @abstract
   * @example
   * // filters example
   * {
   *    name: 'Tom',
   *    createdAt: { from: '2019-01-01', to: '2019-01-18' }
   * }
   */
  async find(filter: Filter, options: {
    limit?: number;
    offset?: number;
    sort?: {
      sortBy?: string;
      direction?: 'asc' | 'desc';
    };
  }): Promise<Array<BaseRecord>> {
    throw new NotImplementedError('BaseResource#find')
  }

  /**
   * Finds one Record in the Resource by its id
   *
   * @param  {String} id      uniq id of the Resource Record
   * @return {Promise<BaseRecord> | null}   record
   * @abstract
   */
  async findOne(id: string): Promise<BaseRecord | null> {
    throw new NotImplementedError('BaseResource#findOne')
  }

  /**
   * Finds many records based on the resource ids
   *
   * @param   {Array<string>}              list of ids to find
   *
   * @return  {Promise<Array<BaseRecord>>} records
   */
  async findMany(ids: Array<string | number>): Promise<Array<BaseRecord>> {
    throw new NotImplementedError('BaseResource#findMany')
  }

  /**
   * Builds new Record of given Resource.
   *
   * Each Record is an representation of the resource item. Before it can be saved,
   * it has to be instantiated.
   *
   * This function has to be implemented if you want to create new records.
   *
   * @param  {Record<string, any>} params
   * @return {BaseRecord}
   */
  build(params: Record<string, any>): BaseRecord {
    return new BaseRecord(params, this)
  }

  /**
   * Creates new record
   *
   * @param  {Record<string, any>}     params
   * @return {Promise<Object>}         created record converted to raw Object which
   *                                   can be used to initiate new {@link BaseRecord} instance
   * @throws {ValidationError}         If there are validation errors it should be thrown
   * @abstract
   */
  async create(params: Record<string, any>): Promise<ParamsType> {
    throw new NotImplementedError('BaseResource#create')
  }

  /**
   * Updates an the record.
   *
   * @param  {String} id               uniq id of the Resource Record
   * @param  {Record<string, any>}     params
   * @return {Promise<Object>}         created record converted to raw Object which
   *                                   can be used to initiate new {@link BaseRecord} instance
   * @throws {ValidationError}         If there are validation errors it should be thrown
   * @abstract
   */
  async update(id: string, params: Record<string, any>): Promise<ParamsType> {
    throw new NotImplementedError('BaseResource#update')
  }

  /**
   * Delete given record by id
   *
   * @param  {String | Number}           id id of the Record
   * @throws {ValidationError}           If there are validation errors it should be thrown
   * @abstract
   */
  async delete(id: string): Promise<void> {
    throw new NotImplementedError('BaseResource#delete')
  }

  /**
   * Assigns given decorator to the Resource. Than it will be available under
   * resource.decorate() method
   *
   * @param  {BaseDecorator}  Decorator
   * @param  {AdminJS}       admin         current instance of AdminJS
   * @param  {ResourceOptions} [options]
   * @private
   */
  assignDecorator(admin: AdminJS, options: ResourceOptions = {}): void {
    this._decorated = new ResourceDecorator({ resource: this, admin, options })
  }

  /**
   * Gets decorator object for given resource
   * @return {BaseDecorator | null}
   */
  decorate(): ResourceDecorator {
    if (!this._decorated) {
      throw new Error('resource does not have any assigned decorator yet')
    }
    return this._decorated
  }
}

export default BaseResource
