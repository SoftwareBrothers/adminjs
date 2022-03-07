import { DecoratedActions } from './utils/decorate-actions';
import { BaseResource, BaseRecord } from '../../adapters';
import { PropertyDecorator, ActionDecorator } from '..';
import AdminJS from '../../../adminjs';
import { ResourceOptions } from './resource-options.interface';
import { CurrentAdmin } from '../../../current-admin.interface';
import { ResourceJSON, PropertyPlace } from '../../../frontend/interfaces';
import { DecoratedProperties } from './utils';
/**
 * Default maximum number of items which should be present in a list.
 *
 * @type {Number}
 * @private
 */
export declare const DEFAULT_MAX_COLUMNS_IN_LIST = 8;
/**
 * Base decorator class which decorates the Resource.
 *
 * @category Decorators
 */
declare class ResourceDecorator {
    /**
     * Map of all root level properties. By root properties we mean property which is not nested
     * under other mixed property.
     *
     * Examples from PropertyOptions:
     * {
     *   rootProperty: { type: mixed }, // root property
     *
     *    // nested property - this should go be the subProperty of rootProperty
     *   'rootProperty.nested': { type: 'string' }
     *
     *   // also root property because there is no another property of type mixed
     *   'another.property': { type: 'string' },
     * }
     *
     * for a the reference {@see decorateProperties}
     */
    properties: DecoratedProperties;
    options: ResourceOptions;
    actions: DecoratedActions;
    private _resource;
    private _admin;
    private h;
    /**
     * @param  {object}       options
     * @param  {BaseResource} options.resource  resource which is decorated
     * @param  {AdminJS}     options.admin  current instance of AdminJS
     * @param  {ResourceOptions} [options.options]
     */
    constructor({ resource, admin, options }: {
        resource: BaseResource;
        admin: AdminJS;
        options: ResourceOptions;
    });
    /**
     * Returns the name for the resource.
     * @return {string} resource name
     */
    getResourceName(): string;
    /**
     * Returns the id for the resource.
     * @return {string} resource id
     */
    id(): string;
    /**
     * Returns resource parent along with the icon. By default it is a
     * database type with its icon
     * @return {Parent}   ResourceJSON['parent']}
     */
    getNavigation(): ResourceJSON['navigation'];
    /**
     * Returns propertyDecorator by giving property path
     *
     * @param   {String}  propertyPath  property path
     *
     * @return  {PropertyDecorator}
     */
    getPropertyByKey(propertyPath: string): PropertyDecorator | null;
    /**
     * Returns list of all properties which will be visible in given place (where)
     *
     * @param   {Object}  options
     * @param   {String}  options.where   one of: 'list', 'show', 'edit', 'filter'
     * @param   {String}  [options.max]   maximum number of properties returned where there are
     *                                    no overrides in the options
     *
     * @return {Array<PropertyDecorator>}
     */
    getProperties({ where, max }: {
        where?: PropertyPlace;
        max?: number;
    }): Array<PropertyDecorator>;
    /**
     * Returns all the properties with corresponding subProperties in one object.
     */
    getFlattenProperties(): Record<string, PropertyDecorator>;
    getListProperties(): Array<PropertyDecorator>;
    /**
     * List of all actions which should be invoked for entire resource and not
     * for a particular record
     *
     * @param {CurrentAdmin} currentAdmin   currently logged in admin user
     * @return  {Array<ActionDecorator>}     Actions assigned to resources
     */
    resourceActions(currentAdmin?: CurrentAdmin): Array<ActionDecorator>;
    /**
     * List of all actions which should be invoked for entire resource and not
     * for a particular record
     *
     * @param {CurrentAdmin} currentAdmin   currently logged in admin user
     * @return  {Array<ActionDecorator>}     Actions assigned to resources
     */
    bulkActions(record: BaseRecord, currentAdmin?: CurrentAdmin): Array<ActionDecorator>;
    /**
     * List of all actions which should be invoked for given record and not
     * for an entire resource
     *
     * @param {CurrentAdmin} [currentAdmin]   currently logged in admin user
     * @return  {Array<ActionDecorator>}     Actions assigned to each record
     */
    recordActions(record: BaseRecord, currentAdmin?: CurrentAdmin): Array<ActionDecorator>;
    /**
     * Returns PropertyDecorator of a property which should be treated as a title property.
     *
     * @return  {PropertyDecorator} PropertyDecorator of title property
     */
    titleProperty(): PropertyDecorator;
    /**
     * Returns title for given record.
     *
     * For example: If given record has `name` property and this property has `isTitle` flag set in
     * options or by the Adapter - value for this property will be shown
     *
     * @param   {BaseRecord}  record
     *
     * @return  {String}      title of given record
     */
    titleOf(record: BaseRecord): string;
    getHref(currentAdmin?: CurrentAdmin): string | null;
    /**
     * Returns JSON representation of a resource
     *
     * @param {CurrentAdmin} currentAdmin
     * @return  {ResourceJSON}
     */
    toJSON(currentAdmin?: CurrentAdmin): ResourceJSON;
}
export default ResourceDecorator;
