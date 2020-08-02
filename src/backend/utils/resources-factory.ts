import BaseResource from '../adapters/base-resource'
import AdminBro, { Adapter } from '../../admin-bro'
import { ResourceWithOptions } from '../../admin-bro-options.interface'
import { mergeResourceOptions } from './build-feature'

class NoDatabaseAdapterError extends Error {
  private database: string

  constructor(database: string) {
    const message = 'There are no adapters supporting one of the database you provided'
    super(message)
    this.database = database
    this.name = 'NoDatabaseAdapterError'
  }
}

class NoResourceAdapterError extends Error {
  private resource: BaseResource

  constructor(resource: BaseResource) {
    const message = 'There are no adapters supporting one of the resource you provided'
    super(message)
    this.resource = resource
    this.name = 'NoResourceAdapterError'
  }
}

class ResourcesFactory {
  private adapters: Array<Adapter>

  private admin: AdminBro

  constructor(admin, adapters: Array<Adapter> = []) {
    this.adapters = adapters
    this.admin = admin
  }

  buildResources({ databases, resources }): Array<BaseResource> {
    const optionsResources = this._convertResources(resources)

    // fetch only those resources from database which weren't previously given as a resource
    const databaseResources = this._convertDatabases(databases).filter(dr => (
      !optionsResources.find(optionResource => optionResource.resource.id() === dr.id())
    ))

    return this._decorateResources([...databaseResources, ...optionsResources])
  }

  /**
   * Changes database give by the user in configuration to list of supported resources
   * @param  {Array<any>} databases    list of all databases given by the user in
   *                                   {@link AdminBroOptions}
   * @return {Array<BaseResource>}     list of all resources from given databases
  */
  _convertDatabases(databases: Array<any>): Array<BaseResource> {
    return databases.reduce((memoArray, db) => {
      const databaseAdapter = this.adapters.find(adapter => (
        adapter.Database.isAdapterFor(db)
      ))
      if (!databaseAdapter) {
        throw new NoDatabaseAdapterError(db)
      }
      return memoArray.concat(new databaseAdapter.Database(db).resources())
    }, [])
  }

  /**
   * Maps resources given by user to resources supported by AdminBro.
   *
   * @param  {any[]}           resources                array of all resources given by the user
   *                                                    in {@link AdminBroOptions}
   * @param  {any}             resources[].resource     optionally user can give resource along
   *                                                    with options
   * @param  {Object}          resources[].options      options given along with the resource
   * @return {Object[]}                                 list of Objects with resource and options
   *                                                    keys
   *
   * @example
   * AdminBro._convertResources([rawAdminModel, {resource: rawUserMode, options: {}}])
   * // => returns: [AdminModel, {resource: UserModel, options: {}}]
   * // where AdminModel and UserModel were converted by appropriate database adapters.
   */
  _convertResources(resources: Array<any | ResourceWithOptions>): Array<any> {
    return resources.map((rawResource) => {
      // resource can be given either by a value or within an object within resource key
      const resourceObject = rawResource.resource || rawResource
      const resourceAdapter = this.adapters.find(adapter => (
        adapter.Resource.isAdapterFor(resourceObject)
      ))
      if (!resourceAdapter && !(resourceObject instanceof BaseResource)) {
        throw new NoResourceAdapterError(resourceObject)
      }
      return {
        resource: resourceAdapter ? new resourceAdapter.Resource(resourceObject) : resourceObject,
        options: rawResource.options,
        features: rawResource.features,
      }
    })
  }

  /**
   * Assigns decorator to each resource and initializes it with `options` and current `admin`
   * instance
   * @param  {Array<Object | BaseResource>} resources    array of all mapped resources given by the
   *                                                     user in {@link AdminBroOptions} along with
   *                                                     options
   * @param  {BaseResource}  resources[].resource        optionally user can give resource along
   *                                                     with options
   * @param  {Object} [resources[].options]              options for given resource
   * @return {BaseResource[]}                            list of resources with decorator assigned
   */
  _decorateResources(resources: Array<ResourceWithOptions>): Array<BaseResource> {
    return resources.map((resourceObject) => {
      const resource = resourceObject.resource || resourceObject
      const { features = [], options = {} } = resourceObject

      const optionsFromFeatures = features.reduce((opts, feature) => (
        feature(opts)
      ), {})

      resource.assignDecorator(
        this.admin,
        mergeResourceOptions(optionsFromFeatures, options),
      )
      return resource
    })
  }
}

export default ResourcesFactory
