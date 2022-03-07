"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ResourcesFactory = exports.NoResourceAdapterError = exports.NoDatabaseAdapterError = void 0;

var _baseResource = _interopRequireDefault(require("../../adapters/resource/base-resource"));

var _buildFeature = require("../build-feature");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NoDatabaseAdapterError extends Error {
  constructor(database) {
    const message = 'There are no adapters supporting one of the database you provided';
    super(message);
    this.database = database;
    this.name = 'NoDatabaseAdapterError';
  }

}

exports.NoDatabaseAdapterError = NoDatabaseAdapterError;

class NoResourceAdapterError extends Error {
  constructor(resource) {
    const message = 'There are no adapters supporting one of the resource you provided';
    super(message);
    this.resource = resource;
    this.name = 'NoResourceAdapterError';
  }

}

exports.NoResourceAdapterError = NoResourceAdapterError;

class ResourcesFactory {
  constructor(admin, adapters = []) {
    this.adapters = adapters;
    this.admin = admin;
  }

  buildResources({
    databases,
    resources
  }) {
    const optionsResources = this._convertResources(resources); // fetch only those resources from database which weren't previously given as a resource


    const databaseResources = this._convertDatabases(databases).filter(dr => !optionsResources.find(optionResource => optionResource.resource.id() === dr.id()));

    return this._decorateResources([...databaseResources, ...optionsResources]);
  }
  /**
   * Changes database give by the user in configuration to list of supported resources
   * @param  {Array<any>} databases    list of all databases given by the user in
   *                                   {@link AdminJSOptions}
   * @return {Array<BaseResource>}     list of all resources from given databases
  */


  _convertDatabases(databases) {
    return databases.reduce((memoArray, db) => {
      const databaseAdapter = this.adapters.find(adapter => adapter.Database.isAdapterFor(db));

      if (!databaseAdapter) {
        throw new NoDatabaseAdapterError(db);
      }

      return memoArray.concat(new databaseAdapter.Database(db).resources());
    }, []);
  }
  /**
   * Maps resources given by user to resources supported by AdminJS.
   *
   * @param  {any[]}           resources                array of all resources given by the user
   *                                                    in {@link AdminJSOptions}
   * @param  {any}             resources[].resource     optionally user can give resource along
   *                                                    with options
   * @param  {Object}          resources[].options      options given along with the resource
   * @return {Object[]}                                 list of Objects with resource and options
   *                                                    keys
   *
   * @example
   * AdminJS._convertResources([rawAdminModel, {resource: rawUserMode, options: {}}])
   * // => returns: [AdminModel, {resource: UserModel, options: {}}]
   * // where AdminModel and UserModel were converted by appropriate database adapters.
   */


  _convertResources(resources) {
    return resources.map(rawResource => {
      // resource can be given either by a value or within an object within resource key
      const resourceObject = rawResource.resource || rawResource;
      const resourceAdapter = this.adapters.find(adapter => adapter.Resource.isAdapterFor(resourceObject));

      if (!resourceAdapter && !(resourceObject instanceof _baseResource.default)) {
        throw new NoResourceAdapterError(resourceObject);
      }

      return {
        resource: resourceAdapter ? new resourceAdapter.Resource(resourceObject) : resourceObject,
        options: rawResource.options,
        features: rawResource.features
      };
    });
  }
  /**
   * Assigns decorator to each resource and initializes it with `options` and current `admin`
   * instance
   * @param  {Array<Object | BaseResource>} resources    array of all mapped resources given by the
   *                                                     user in {@link AdminJSOptions} along with
   *                                                     options
   * @param  {BaseResource}  resources[].resource        optionally user can give resource along
   *                                                     with options
   * @param  {Object} [resources[].options]              options for given resource
   * @return {BaseResource[]}                            list of resources with decorator assigned
   */


  _decorateResources(resources) {
    return resources.map(resourceObject => {
      const resource = resourceObject.resource || resourceObject;
      const {
        features = [],
        options = {}
      } = resourceObject;
      const optionsFromFeatures = features.reduce((opts, feature) => feature(opts), {});
      resource.assignDecorator(this.admin, (0, _buildFeature.mergeResourceOptions)(optionsFromFeatures, options));
      return resource;
    });
  }

}

exports.ResourcesFactory = ResourcesFactory;
var _default = ResourcesFactory;
exports.default = _default;