import AdminJS from '../../../adminjs';
import PropertyOptions from './property-options.interface';
import BaseResource from '../../adapters/resource/base-resource';
import BaseProperty, { PropertyType } from '../../adapters/property/base-property';
import ResourceDecorator from '../resource/resource-decorator';
import { PropertyPlace, BasePropertyJSON } from '../../../frontend/interfaces';
/**
 * Decorates property
 *
 * @category Decorators
 */
declare class PropertyDecorator {
    property: BaseProperty;
    /**
     * Property path including all parents.
     * For root property (this without a parent) it will be its name.
     * But when property has children their paths will include parent path:
     * `parentName.subPropertyName`.
     *
     * This path serves as a key in {@link PropertyOptions} to identify which
     * property has to be updated
     */
    propertyPath: string;
    /**
     * Indicates if given property has been created in AdminJS and hasn't been returned by the
     * database adapter
     */
    isVirtual: boolean;
    private _admin;
    private _resource;
    options: PropertyOptions;
    /**
     * Array of all subProperties which were added in {@link ResourceOption} interface rather than
     * in the database
     *
     * @private
     */
    private virtualSubProperties;
    /**
     * @param {Object} opts
     * @param {BaseProperty}        opts.property
     * @param  {AdminJS}           opts.admin  current instance of AdminJS
     * @param {PropertyOptions}     opts.options
     * @param {ResourceDecorator}   opts.resource
     */
    constructor({ property, admin, options, resource, path, isVirtual }: {
        property: BaseProperty;
        admin: AdminJS;
        options?: PropertyOptions;
        resource: ResourceDecorator;
        path?: string;
        isVirtual?: boolean;
    });
    /**
     * True if given property can be sortable
     *
     * @returns {boolean}
     */
    isSortable(): boolean;
    /**
     * When given property is a reference to another Resource - it returns this Resource
     *
     * @return  {BaseResource} reference resource
     */
    reference(): BaseResource | null;
    referenceName(): string | null;
    /**
     * Name of the property
     *
     * @returns {string}
     */
    name(): string;
    /**
     * Resource decorator of given property
     */
    resource(): ResourceDecorator;
    /**
     * Label of a property
     *
     * @return  {string}
     */
    label(): string;
    /**
     * Property type
     *
     * @returns {PropertyType}
     */
    type(): PropertyType;
    /**
     * If given property has limited number of available values
     * it returns them.
     *
     * @returns {Array<{value: string, label: string}>}
     */
    availableValues(): null | Array<{
        value: string | number;
        label: string;
    }>;
    isArray(): boolean;
    isDraggable(): boolean;
    /**
     * Indicates if given property should be visible
     *
     * @param {'list' | 'edit' | 'show' | 'filter'} where
     */
    isVisible(where: PropertyPlace): boolean;
    /**
     * Position of the field
     *
     * @return {number}
     */
    position(): number;
    /**
     * If property should be treated as an ID field
     *
     * @return {boolean}
     */
    isId(): boolean;
    /**
     * If property should be marked as a required with a star (*)
     *
     * @return {boolean}
     */
    isRequired(): boolean;
    /**
     * If property should be treated as an title field
     * Title field is used as a link to the resource page
     * in the list view and in the breadcrumbs
     *
     * @return {boolean}
     */
    isTitle(): boolean;
    /**
     * If property should be disabled in the UI
     *
     * @return  {boolean}
     */
    isDisabled(): boolean;
    /**
     * Returns JSON representation of a property
     *
     * @param {PropertyPlace} [where]
     *
     * @return {PropertyJSON}
     */
    toJSON(where?: PropertyPlace): BasePropertyJSON;
    /**
     * Decorates subProperties
     *
     * @return  {Array<PropertyDecorator>}  decorated subProperties
     */
    subProperties(): Array<PropertyDecorator>;
    addSubProperty(subProperty: PropertyDecorator): void;
    /**
     * Returns PropertyOptions passed by the user for a subProperty. Furthermore
     * it changes property name to the nested property key.
     *
     * @param   {String}     propertyPath
     * @return  {PropertyOptions}
     * @private
     */
    private getOptionsForSubProperty;
}
export default PropertyDecorator;
