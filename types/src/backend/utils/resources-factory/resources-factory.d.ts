import BaseResource from '../../adapters/resource/base-resource';
import { Adapter } from '../../../adminjs';
import { ResourceWithOptions } from '../../../adminjs-options.interface';
export declare class NoDatabaseAdapterError extends Error {
    private database;
    constructor(database: string);
}
export declare class NoResourceAdapterError extends Error {
    private resource;
    constructor(resource: BaseResource);
}
export declare class ResourcesFactory {
    private adapters;
    private admin;
    constructor(admin: any, adapters?: Array<Adapter>);
    buildResources({ databases, resources }: {
        databases: any;
        resources: any;
    }): Array<BaseResource>;
    /**
     * Changes database give by the user in configuration to list of supported resources
     * @param  {Array<any>} databases    list of all databases given by the user in
     *                                   {@link AdminJSOptions}
     * @return {Array<BaseResource>}     list of all resources from given databases
    */
    _convertDatabases(databases: Array<any>): Array<BaseResource>;
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
    _convertResources(resources: Array<any | ResourceWithOptions>): Array<any>;
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
    _decorateResources(resources: Array<ResourceWithOptions>): Array<BaseResource>;
}
export default ResourcesFactory;
