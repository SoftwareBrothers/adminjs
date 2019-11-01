import Action from '../actions/action.interface'
import PropertyOptions from './property-options.interface'

/**
 * Options for given resource
 *
 * ### Usage with TypeScript
 *
 * ```typescript
 * import { ResourceOptions } from 'admin-bro'
 * ```
 */
export interface ResourceOptions {
  /**
   * Name of a resource
   */
  name?: string;
  /**
   * List of properties which should be visible on a list
   */
  listProperties?: Array<string>;
  /**
   * List of properties which should be visible on show view
   */
  showProperties?: Array<string>;
  /**
   * List of properties which should be visible on edit view
   */
  editProperties?: Array<string>;
  /**
   * List of properties which should be visible on the filter
   */
  filterProperties?: Array<string>;
  /**
   * Parent element under which resource should be nested in sidbear. Default
   * to the database name.
   */
  parent?: {
    name?: string;
    icon?: string;
  } | string;
  /**
   * Default sort property and direction.
   */
  sort?: {
    direction: 'asc' | 'desc';
    sortBy: string;
  };
  /**
   * List of properties along with their options
   */
  properties?: Record<string, PropertyOptions>;
  /**
   * List of all actions along with their options
   */
  actions?: Record<string, Action>;
}
