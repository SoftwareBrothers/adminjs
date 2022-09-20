import { ResourceJSON, PageJSON } from '@adminjs/common/interfaces'

import BaseResource from './adapters/resource/base-resource'
import BaseDatabase from './adapters/database/base-database'
import { PageContext } from './actions/action.interface'
import { ResourceOptions } from './decorators/resource/resource-options.interface'

/**
 * AdminJSOptions
 *
 * This is the heart of entire AdminJS - all options reside here.
 *
 * ### Usage with regular javascript
 *
 * ```javascript
 * const AdminJS = require('adminjs')
 * //...
 * const adminJS = new AdminJS({
 *   paths: {
 *     roothPath: '/xyz-admin',
 *     logoutPath: '/xyz-admin/exit',
 *     loginPath: '/xyz-admin/sign-in',
 *   },
 *   databases: [mongooseConnection],
 *   resources: [{ resource: ArticleModel, options: {...}}],
 * })
 * ```
 *
 * ### TypeScript
 *
 * ```
 * import { AdminJSOptions } from 'adminjs'
 *
 * const options: AdminJSOptions = {
 *   paths: {
 *     roothPath: '/xyz-admin',
 *     logoutPath: '/xyz-admin/exit',
 *     loginPath: '/xyz-admin/sign-in',
 *   },
 *   databases: [mongooseConnection],
 *   resources: [{ resource: ArticleModel, options: {...}}],
 * }
 *
 * const adminJs = new AdminJS(options)
 * ```
 */
export interface AdminJSOptions<T = unknown> {
  paths?: {
    /**
     * path, under which, AdminJS will be available. Defaults to `/admin`
     */
    rootPath?: string;
    /**
     * url to a logout action, defaults to `/admin/logout`
     */
    logoutPath?: string;
    /**
     * url to a login page, defaults to `/admin/login`
     */
    loginPath?: string;
  };

  /**
   * Array of all Databases which are supported by AdminJS via adapters
   */
  databases?: Array<any>;

  /**
   * List of custom pages which will be visible below all resources
   * @example
   * pages: {
   *   customPage: {
   *     handler: async (request, response, context) => {
   *       return {
   *         text: 'I am fetched from the backend',
   *       }
   *     },
   *   },
   * },
   */
  pages?: AdminPages;
  /**
   * Array of all Resources which are supported by AdminJS via adapters.
   * You can pass either resource or resource with an options and thus modify it.
   * @property {T} resources[].resource
   * @property {ResourceOptions} resources[].options
   * @property {Array<FeatureType>} resources[].features
   *
   * @see ResourceOptions
   */
  resources?: Array<ResourceWithOptions | T>;
  /**
   * Option to modify the dashboard
   */
  dashboard?: {
    /**
     * Handler function which can be triggered using {@link ApiClient#getDashboard}.
     */
    handler?: PageHandler;
  };

  /**
   * Additional settings.
   */
  settings?: Partial<AdminJSSettings>;
}

export type AdminJSSettings = {
  defaultPerPage: number;
};

/**
 * Object describing regular page in AdminJS
 *
 * @alias AdminPage
 * @memberof AdminJSOptions
 */
export type AdminPage = {
  /**
   * Page label/name
   */
  handler?: PageHandler;
}

/**
 * Object describing map of regular pages in AdminJS
 *
 * @alias AdminPages
 * @memberof AdminJSOptions
 */
export type AdminPages = Record<string, AdminPage>

/**
 * Default way of passing Options with a Resource
 * @alias ResourceWithOptions
 * @memberof AdminJSOptions
 */
export type ResourceWithOptions = {
  resource: any;
  options: ResourceOptions;
  features?: Array<FeatureType>;
}

/**
 * Function taking {@link ResourceOptions} and merging it with all other options
 *
 * @alias FeatureType
 * @type function
 * @returns {ResourceOptions}
 * @memberof AdminJSOptions
 */
export type FeatureType = (
  /**
   * Options returned by the feature added before
   */
  options: ResourceOptions
) => ResourceOptions

/**
 * Function which is invoked when user enters given AdminPage
 *
 * @alias PageHandler
 * @memberof AdminJSOptions
 */
export type PageHandler = (
  request: any,
  response: any,
  context: PageContext,
) => Promise<any>

export interface AdminJSOptionsWithDefault extends AdminJSOptions {
  databases?: Array<BaseDatabase>;
  resources?: Array<BaseResource | {
    resource: BaseResource;
    options: ResourceOptions;
  }>;
  dashboard: {
    handler?: PageHandler;
  };
  pages: AdminJSOptions['pages'];
  paths: {
    rootPath: string;
    loginPath: string;
    logoutPath: string;
  }
}

export interface AdminJSOptionsJson {
  resources: ResourceJSON[];
  paths: {
    loginPath: string;
    logoutPath: string;
    [path: string]: string;
  };
  pages: PageJSON[];
}
