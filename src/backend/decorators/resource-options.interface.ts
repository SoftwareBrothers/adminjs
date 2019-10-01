import Action from '../actions/action.interface'
import { PropertyOptions } from './property-options.interface'

/**
 * @typedef {Object} ResourceOptions
 * @property {String} name      name of a resource
 * @property {Array<String>}  listProperties    list of all properties which should be visible
 *                                              on a list
 * @property {Array<String>}  showProperties    list of all properties which should be visible
 *                                              on an object view
 * @property {Array<String>}  editProperties    list of all properties which should be visible
 *                                              on edit screen
 * @property {Array<String>}  filterProperties  list of all properties which should be visible
 *                                              in the filter
 * @property {Object | String} parent   parent category in the sidebar
 * @property {Object} [sort]            default sort parameters
 * @property {String} [sort.direction='asc']  either `asc` or `desc`.
 * @property {String} [sort.sortBy]     name of the field on which by default items should be
 *                                      sorted in a list. Default to first property.
 * @property {String} parent.name       name of the parent category
 * @property {String} parent.icon       icon class of a parent category (i.e. 'icon-bomb')
 * @property {Object<String, PropertyOptions>} properties list of properties with their options
 * @property {Object<String, BaseAction>} actions   list of actions
 */

export interface ResourceOptions {
  name?: string;
  listProperties?: Array<string>;
  showProperties?: Array<string>;
  editProperties?: Array<string>;
  filterProperties?: Array<string>;
  parent?: {
    name?: string;
    icon?: string;
  } | string;
  sort?: {
    direction: 'asc' | 'desc';
    sortBy: string;
  };
  properties?: Map<string, PropertyOptions> | {};
  actions?: Map<string, Action>;
}
