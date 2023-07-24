import type { IconProps } from '@adminjs/design-system'

import { Action, ActionResponse, RecordActionResponse, BulkActionResponse } from '../../actions/action.interface.js'
import PropertyOptions from '../property/property-options.interface.js'
import { ListActionResponse } from '../../actions/list/list-action.js'
import { CurrentAdmin } from '../../../current-admin.interface.js'
import BaseResource from '../../adapters/resource/base-resource.js'
import ViewHelpers from '../../utils/view-helpers/view-helpers.js'
import { SearchActionResponse } from '../../actions/search/search-action.js'
import { LocaleTranslationsBlock } from '../../../index.js'

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
   * Name of title property
   */
  titleProperty?: string;
  /**
   * Where resource link in sidebar should redirect. Default to the list action.
   */
  href?: HrefFunction | string;
  /**
   * Navigation option saying under which menu this resource should be nested in sidebar.
   * Default to the database name.
   *
   * You have couple of options:
   * - when you set both navigation.name and navigation.icon this resource will be nested under
   *   this menu.
   * - when you set navigation.name or navigation to a string this resource will be nested under
   *   this menu and the icon will come from the database type
   * - when you set navigation.icon but leave navigation.name as `null` this resource will be top
   *   level and it will have an icon.
   * - when you set navigation to null this resource will be top level, but without the icon
   * - when you set navigation to false this resource will be hidden in the navigation
   * @new In version 3.3
   */
  navigation?: {
    name?: string | null;
    icon?: IconProps['icon'];
  } | string | boolean | null;

  /**
   * @deprecated in favour of {@link ResourceOptions.navigation}
   */
  parent?: {
    name?: string | null;
    icon?: IconProps['icon'];
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
  /**
   * Resource-specific translations
   */
  translations?: {
    [language: string]: LocaleTranslationsBlock;
  }
}
