import PropertyJSON from './property-json.interface'
import ActionJSON from './action-json.interface'

/**
 * Resource object accessible on the fronted
 * @alias ResourceJSON
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
   * url to a resource list action
   */
  href: string;
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
  };
  /**
   * Property which should be treaten as a Main property
   */
  titleProperty: PropertyJSON;
  /**
   * All actions available for entire resource
   */
  resourceActions: Array<ActionJSON>;
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
