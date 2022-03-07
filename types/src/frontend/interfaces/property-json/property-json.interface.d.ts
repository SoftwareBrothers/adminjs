import { PropertyType } from '../../../backend/adapters/property/base-property';
export declare type PropertyPlace = 'show' | 'list' | 'edit' | 'filter';
/**
 * JSON representation of a Property.
 * @subcategory Frontend
 */
export interface PropertyJSON {
    /**
     * If given property should be treated as a title
     */
    isTitle: boolean;
    /**
     * If given property should be treated as a Id field
     */
    isId: boolean;
    /**
     * Property position on a list
     */
    position: number;
    /**
     * If property is sortable
     */
    isSortable: boolean;
    /**
     * If property has restricted number of values
     */
    availableValues: Array<{
        label: string;
        value: string | number;
    }> | null;
    /**
     * Property uniq name
     */
    name: string;
    /**
     * Property uniq path. For top level properties - the same as name, but for nested
     * properties it is separated with dot notation: `nested.property`
     * @new in version 3.3
     */
    propertyPath: string;
    /**
     * Path of the actual value inside the record. It is usually the same as propertyPath, with the
     * exception of array values.
     * @new in version 3.3
     */
    path: string;
    /**
     * Property label
     */
    label: string;
    /**
     * Description of field. Shown as hoverable hint after label.
     *
     * To use translations provide it in locale with specified options key from resource
     * @example
     * ```js
     * new AdminJS({
     *   resources: [
     *     {
     *       resource: myResource,
     *       options: {
     *         properties: {
     *           myAwesomeProperty: {
     *             description: "Plane description" || "awesomeHint", // <- message key in locale
     *           },
     *         },
     *       },
     *     },
     *   ],
     *   locale: {
     *     translations: {
     *       resources: {
     *         myResource: {
     *           messages: {
     *             awesomeHint: "Locale description",
     *           },
     *         },
     *       },
     *     },
     *   },
     * });
     * ```
     * @new In version 5.6
     */
    description?: string;
    /**
     * One of {@link PropertyType}s
     */
    type: PropertyType;
    /**
     * Has a name of a resource to which it is a reference.
     * For instance property `userId` will have here `Users`
     */
    reference: string | null;
    /**
     * Indicates if property is an array of properties
     */
    isArray: boolean;
    /**
     * Indicates if array elements should be draggable when editing.
     * It is only usable if the property is an array.
     */
    isDraggable: boolean;
    /**
     * Contain list of all sub properties.
     * This is the case for nested schemas in MongoDB.
     */
    subProperties: Array<BasePropertyJSON>;
    /**
     * All component names overridden by the user in PropertyOptions
     */
    components?: {
        show?: string;
        edit?: string;
        filter?: string;
        list?: string;
    };
    /**
     * Custom parameters passed from the {@link PropertyOptions.custom}.
     */
    custom: {
        [key: string]: any;
    };
    /**
     * Additional props passed to the actual react component
     * @new in version 3.3
     */
    props: {
        [key: string]: any;
    };
    /**
     * Whether the field should be disabled in edition
     */
    isDisabled: boolean;
    /**
     * Whether the field should be marked as required (with a star)
     */
    isRequired: boolean;
    /**
     * if label above the input should be hidden
     */
    hideLabel: boolean;
    /**
     * Resource to which given property belongs
     */
    resourceId: string;
    /**
     * Indicates if given property has been created in AdminJS {@link PropertyOptions} and hasn't
     * been returned by the database adapter.
     * @new in version 3.3
     */
    isVirtual: boolean;
}
export declare type BasePropertyJSON = Omit<PropertyJSON, 'path'>;
/**
 * Property without the path. Defined as `Omit<PropertyJSON, 'path'>`
 *
 * @typedef {Object} BasePropertyJSON
 * @property {any} ...   properties from {@link PropertyJSON} except `path`
 * @alias BasePropertyJSON
 * @memberof PropertyJSON
 * @new in version 3.3
 */
