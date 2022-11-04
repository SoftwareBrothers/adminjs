import { BasePropertyJSON } from './property-json';
import { ActionJSON } from './action/action-json.interface';
/**
 * Resource object accessible on the fronted
 * @alias ResourceJSON
 * @subcategory Frontend
 */
export interface ResourceJSON {
    /**
     * Unique Id of a resource
     */
    id: string;
    /**
     * Resource name
     */
    name: string;
    /**
     * url to a resource list action. If null - resource should not be seen in the sidebar.
     */
    href: string | null;
    /**
     * Resource parent - visible on the sidebar
     */
    navigation: {
        /**
         * Parent name
         */
        name: string | null;
        /**
         * Parent icon
         */
        icon: string;
        /**
         * Visibility
         */
        show: boolean;
    } | null;
    /**
     * Property which should be treated as a Main property
     */
    titleProperty: BasePropertyJSON;
    /**
     * Actions available for entire resource with type: resource
     */
    resourceActions: Array<ActionJSON>;
    /**
     * All actions - whether they are available or not.
     */
    actions: Array<ActionJSON>;
    /**
     * Properties which should be visible on the list
     */
    listProperties: Array<BasePropertyJSON>;
    /**
     * Properties which should be visible on the edit view
     */
    editProperties: Array<BasePropertyJSON>;
    /**
     * Properties which should be visible on the show view
     */
    showProperties: Array<BasePropertyJSON>;
    /**
     * Properties which should be visible on the filter
     */
    filterProperties: Array<BasePropertyJSON>;
    /**
     * Map of all properties inside the resource. It also contains nested properties.
     * So this is the easies way of getting any property you like from a resource.
     */
    properties: Record<string, BasePropertyJSON>;
}
