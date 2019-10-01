import PropertyJSON from './property-json.interface'
import ActionJSON from './action-json.interface'

/**
   * @typedef {Object} BaseResource~JSON
   * @property {String} id        uniq ID of a resource
   * @property {String} name      resource name used in the UI
   * @property {String} href      resource url
   * @property {String} parent.name       name of the parent category
   * @property {String} parent.icon       icon class of a parent category (i.e. 'icon-bomb')
   * @property {Array<BaseProperty~JSON} titleProperty     name of a property which
   *                                                       should be treated as a
   *                                                       _title_ property.
   * @property {Array<Action~JSON>} recordActions   list of all record actions available for
   *                                                given resource
   * @property {Array<Action~JSON>} resourceActions list of all resource actions available
   *                                                for given resource
   * @property {Array<BaseProperty~JSON>} listProperties
   * @property {Array<BaseProperty~JSON>} editProperties
   * @property {Array<BaseProperty~JSON>} showProperties
   * @property {Array<BaseProperty~JSON>} filterProperties
   */

export default interface ResourceJSON {
  id: string;
  name: string;
  href: string;
  parent: {
    name: string;
    icon: string;
  };
  titleProperty: PropertyJSON;
  recordActions: Array<ActionJSON>;
  resourceActions: Array<ActionJSON>;
  listProperties: Array<PropertyJSON>;
  editProperties: Array<PropertyJSON>;
  showProperties: Array<PropertyJSON>;
  filterProperties: Array<PropertyJSON>;
}
