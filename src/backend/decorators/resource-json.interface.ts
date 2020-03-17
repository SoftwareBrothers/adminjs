import PropertyJSON from './property-json.interface'
import ActionJSON from './action-json.interface'

/**
 * Resource object accessible on the fronted
 * @alias ResourceJSON
 * @subcategory Frontend
 */
export default interface ResourceJSON {
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
  parent: {
    /**
     * Parent name
     */
    name: string;
    /**
     * Parent icon
     */
    icon: string;
  } | null;
  /**
   * Property which should be treated as a Main property
   */
  titleProperty: PropertyJSON;
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
  listProperties: Array<PropertyJSON>;
  /**
   * Properties which should be visible on the edit view
   */
  editProperties: Array<PropertyJSON>;
  /**
   * Properties which should be visible on the show view
   */
  showProperties: Array<PropertyJSON>;
  /**
   * Properties which should be visible on the filter
   */
  filterProperties: Array<PropertyJSON>;
}
