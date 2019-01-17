const BaseResource = require('../adapters/base-resource')

class NoDatabaseAdapterError extends Error {
  constructor(database) {
    const message = 'There are no adapters supporting one of the database you provided'
    super(message)
    this.database = database
    this.name = 'NoDatabaseAdapterError'
  }
}

class NoResourceAdapterError extends Error {
  constructor(resource) {
    const message = 'There are no adapters supporting one of the resource you provided'
    super(message)
    this.resource = resource
    this.name = 'NoResourceAdapterError'
  }
}

class ResourcesFactory {
  constructor(admin, adapters = []) {
    this.adapters = adapters
    this.admin = admin
  }

  buildResources({ databases, resources }) {
    const optionsResources = this._convertResources(resources)
    // fetch only those resources from database which werent previousely given as a resource
    const databaseResources = this._convertDatabases(databases).filter(dr => (
      !optionsResources.find(optionResource => optionResource.resource.id() === dr.id())
    ))

    return this._decorateResources(databaseResources.concat(optionsResources))
  }

  /**
   * Changes database give by the user in configuration to list of supported resources
   * @param  {any[]} databases    list of all databases given by the user in {@link AdminBroOptions}
   * @return {BaseResource[]}     list of all resources from given databases
  */
  _convertDatabases(databases) {
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
   *                                                    with decorator
   * @param  {BaseDecorator}   resources[].decorator    decorator given along with the resource
   * @return {Object[]}                                 list of Objects with resource and decorator
   *                                                    keys
   *
   * @example
   * AdminBro._convertResources([rawAdminModel, {resource: rawUserModel, options: UserOptions}])
   * // => returns: [AdminModel, {resource: UserModel, options: UserDecorator}]
   * // where AdminModel and UserModel were converted by appropriate database adapters.
   */
  _convertResources(resources) {
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
      }
    })
  }

  /**
   * Changes assigns decorator to each resource
   * @param  {Object[]}      resources               array of all mapped resources given by the
   *                                                 user in {@link AdminBroOptions} along with
   *                                                 decorators
   * @param  {BaseResource}  resources[].resource    optionally user can give resource along
   *                                                 with decorator
   * @param  {BaseDecorator} [resources[].decorator] decorator given along with the resource
   * @return {BaseResource[]}                        list of resources with decorator assigned
   */
  _decorateResources(resources) {
    return resources.map((resourceObject) => {
      let { resource } = resourceObject
      const { options } = resourceObject
      resource = resource || resourceObject
      resource.assignDecorator(options, this.admin)
      return resource
    })
  }
}

module.exports = ResourcesFactory
