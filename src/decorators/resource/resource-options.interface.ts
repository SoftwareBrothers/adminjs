import { CurrentAdmin } from '@adminjs/common/interfaces'

import { Action, ActionResponse, RecordActionResponse, BulkActionResponse } from '../../actions/action.interface'
import PropertyOptions from '../property/property-options.interface'
import { ListActionResponse } from '../../actions/list/list-action'
import { SearchActionResponse } from '../../actions/search/search-action'
import BaseResource from '../../adapters/resource/base-resource'

/**
 * @alias HrefContext
 * @memberof ResourceOptions
 */
export type HrefContext = {
  /**
   * Resource on which href has been invoked.
   */
  resource: BaseResource;
  /**
   * Currently logged in admin
   */
  currentAdmin?: CurrentAdmin;
}

/**
 * Function returning string or string
 *
 * @alias HrefFunction
 * @memberof ResourceOptions
 */
export type HrefFunction = (context: HrefContext) => string

/**
 * Options for given resource
 *
 * ### Usage with TypeScript
 *
 * ```typescript
 * import { ResourceOptions } from 'adminjs'
 * ```
 */
export interface ResourceOptions {
  /**
   * Unique id of a resource.
   *
   * So let's suppose that you connected 2 databases to AdminJS. Both of them have
   * the same collection: 'users'. In this case AdminJS wont be able to distinguish them.
   * In this case changing Id of one of the resources helps to solve this issue.
   */
  id?: string;
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
  actions?: {
    show?: Partial<Action<RecordActionResponse>>;
    edit?: Partial<Action<RecordActionResponse>>;
    delete?: Partial<Action<RecordActionResponse>>;
    bulkDelete?: Partial<Action<BulkActionResponse>>;
    new?: Partial<Action<RecordActionResponse>>;
    list?: Partial<Action<ListActionResponse>>;
    search?: Partial<Action<SearchActionResponse>>;
  } | {
    [key: string]: Partial<Action<ActionResponse>>;
  };
}
