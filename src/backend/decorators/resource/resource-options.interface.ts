import { Action, ActionResponse, RecordActionResponse, BulkActionResponse } from '../../actions/action.interface'
import PropertyOptions from '../property/property-options.interface'
import { ListActionResponse } from '../../actions/list/list-action'
import { CurrentAdmin } from '../../../current-admin.interface'
import BaseResource from '../../adapters/resource/base-resource'
import ViewHelpers from '../../utils/view-helpers/view-helpers'
import { SearchActionResponse } from '../../actions/search/search-action'

/**
 * @alias HrefContext
 * @memberof ResourceOptions
 */
export type HrefContext = {
  /**
   * view helpers
   */
  h: ViewHelpers;
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
 * import { ResourceOptions } from 'admin-bro'
 * ```
 */
export interface ResourceOptions {
  /**
   * Unique id of a resource.
   *
   * So let's suppose that you connected 2 databases to AdminBro. Both of them have
   * the same collection: 'users'. In this case AdminBro wont be able to distinguish them.
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
   * Where resource link in sidebar should redirect. Default to the list action.
   */
  href?: HrefFunction | string;
  /**
   * Navigation option saying under which resource should be nested in sidebar.
   * Default to the database name.
   *
   * You have couple of options:
   * - when you give both name and icon - your resource will be nested under this menu.
   * - when you set it to null - resource will be top level, but without the icon
   * - finally you can set the icon but leave name as `null`. In such case resource will be
   *   top level and it will have an icon.
   * @new In version 3.3
   */
  navigation?: {
    name?: string | null;
    icon?: string;
  } | string | null;


  /**
   * @deprecated in favour of {@link ResourceOptions.navigation}
   */
  parent?: {
    name?: string | null;
    icon?: string;
  } | string | null;
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
