export declare type PropertyType = 'string' | 'float' | 'number' | 'boolean' | 'date' | 'datetime' | 'mixed' | 'reference' | 'richtext' | 'textarea' | 'password';
declare type BasePropertyAttrs = {
    path: string;
    type?: PropertyType;
    isId?: boolean;
    isSortable?: boolean;
    position?: number;
};
/**
 * Represents Resource Property
 * @category Base
 */
declare class BaseProperty {
    private _path;
    private _type;
    private _isId;
    private _isSortable;
    private _position;
    /**
     * @param  {object} options
     * @param  {string} options.path                     property path: usually it its key but when
     *                                                   property is for an object the path can be
     *                                                   divided to parts by dots: i.e.
     *                                                   'address.street'
     * @param  {PropertyType}  [options.type='string']
     * @param  {boolean} [options.isId=false]            true when field should be treated as an ID
     * @param  {boolean} [options.isSortable=true]       if property should be sortable
     */
    constructor({ path, type, isId, isSortable, position, }: BasePropertyAttrs);
    /**
     * Name of the property
     * @return {string} name of the property
     */
    name(): string;
    path(): string;
    position(): number;
    /**
     * Return type of a property
     * @return {PropertyType}
     */
    type(): PropertyType;
    /**
     * Return true if given property should be treated as a Record Title.
     *
     * @return {boolean}
     */
    isTitle(): boolean;
    /**
     * Indicates if given property should be visible
     *
     * @return {Boolean}
     */
    isVisible(): boolean;
    /**
     * Indicates if value of given property can be updated
     *
     * @return {boolean}
     */
    isEditable(): boolean;
    /**
     * Returns true if given property is a uniq key in a table/collection
     *
     * @return {boolean}
     */
    isId(): boolean;
    /**
     * If property is a reference to a record of different resource
     * it should contain {@link BaseResource.id} of this resource.
     *
     * When property is responsible for the field: 'user_id' in SQL database
     * reference should be the name of the Resource which it refers to: `Users`
     */
    reference(): string | null;
    /**
     * Returns all available values which field can accept. It is used in case of
     * enums
     *
     * @return  {Array<String> | null}  array of all available values or null when field
     *                                  is not an enum.
     */
    availableValues(): Array<string> | null;
    /**
     * Returns true when given property is an array
     *
     * @return  {boolean}
     */
    isArray(): boolean;
    /**
     * Returns true when given property has draggable elements.
     * Only usable for array properties.
     *
     * @return  {boolean}
     */
    isDraggable(): boolean;
    /**
     * In case of `mixed` type returns all nested properties.
     *
     * @return  {Array<BaseProperty>} sub properties
     */
    subProperties(): Array<BaseProperty>;
    /**
     * Indicates if given property can be sorted
     *
     * @return {boolean}
     */
    isSortable(): boolean;
    /**
     * Indicates if given property is required
     */
    isRequired(): boolean;
}
export default BaseProperty;
