import BaseResource from './backend/adapters/base-resource'
import BaseDatabase from './backend/adapters/base-database'
import { PageContext } from './backend/actions/action.interface'
import { ResourceOptions } from './backend/decorators/resource-options.interface'
import { colors, sizes, fonts, breakpoints } from './frontend/styles/variables'

/**
 * AdminBroOptions
 *
 * This is the heart of entire AdminBro - all options resides here.
 *
 * ### Usage with regular javascript
 *
 * ```javascript
 * const AdminBro = require('admin-bro')
 * //...
 * const adminBro = new AdminBro({
 *   rootPath: '/xyz-admin',
 *   logoutPath: '/xyz-admin/exit',
 *   loginPath: '/xyz-admin/sign-in',
 *   databases: [mongooseConnection],
 *   resources: [{ resource: ArticleModel, options: {...}}],
 *   branding: {
 *     companyName: 'XYZ c.o.',
 *   },
 * })
 * ```
 *
 * ### TypeScript
 *
 * ```
 * import { AdminBroOptions } from 'admin-bro
 *
 * const options: AdminBroOptions = {
 *   rootPath: '/xyz-admin',
 *   logoutPath: '/xyz-admin/exit',
 *   loginPath: '/xyz-admin/sign-in',
 *   databases: [mongooseConnection],
 *   resources: [{ resource: ArticleModel, options: {...}}],
 *   branding: {
 *     companyName: 'XYZ c.o.',
 *   },
 * }
 *
 * const adminBro = new AdminBro(options)
 * ```
 */
export default interface AdminBroOptions {
  /**
   * path, under which, AdminBro will be available. Default to `/admin`
   *
   */
  rootPath?: string;
  /**
   * url to a logout action, default to `/admin/logout`
   */
  logoutPath?: string;
  /**
   * url to a login page, default to `/admin/login`
   */
  loginPath?: string;
  /**
   * Array of all Databases which are suported by AdminBro via adapters
   */
  databases?: Array<any>;

  /**
   * Array of all Resources which are supported by AdminBro via adapters.
   * You can pass either resource or resource with an options and thus modify it.
   *
   * @see ResourceOptions
   */
  resources?: Array<any | {
    resource: any;
    options: ResourceOptions;
  }>;
  /**
   * Option to modify the dashboard
   */
  dashboard?: {
    /**
     * Handler function which is triggered in the api when user launches the dashboard.
     */
    handler?: DashboardHandler;
    /**
     * Bundled component name which should be rendered when user opens the dashboard
     */
    component?: string;
  };
  /**
   * Flag which indicates if version number should be visible on the UI
   */
  version?: VersionSettings;
  /**
   * Options which are related to the branding.
   */
  branding?: BrandingOptions;
  /**
   * Custom assets you want to pass to AdminBro
   */
  assets?: {
    /**
     * List to urls of custom stylesheets. You can pass your font - icons here (as an example)
     */
    styles?: Array<string>;
    /**
     * List of urls to custom scripts. If you use some particular js
     * library - you can pass its url here.
     */
    scripts?: Array<string>;
    /**
     * Flag indicates if all default styles and scripts should be fetched from CDN or from local
     * bundle. Default to CDN. You may change this if your internet connection is slow and you are
     * developing AdminBro on local machine.
     */
    globalsFromCDN: boolean;
  };
  /**
   * Environmental variables passed to the frontend.
   *
   * So let say you want to pass some _GOOGLE_MAP_API_TOKEN_ to the frontend.
   * You can do this by adding it here:
   *
   * ```javascript
   * new AdminBro({env: {
   *   GOOGLE_MAP_API_TOKEN: 'my-token',
   * }})
   * ```
   *
   * and this token will be available on the frontend by using:
   *
   * ```javascript
   * AdminBro.envs.GOOGLE_MAP_API_TOKEN
   * ```
   */
  env?: Record<string, string>;
}

/**
 * Version Props
 * @alias VersionProps
 * @memberof AdminBroOptions
 */
export type VersionSettings = {
  /**
   * if set to true - current admin version will be visible
   */
  admin?: boolean;
  /**
   * Here you can pass any arbitrary version text which will be seen in the US.
   * You can pass here your current API version.
   */
  app?: string;
}

export type VersionProps = {
  admin?: string;
  app?: string;
}


/**
 * Branding Options
 *
 * You can use them to change how AdminBro looks. For instance to change name and
 * colors (dark theme) run:
 *
 * ```javascript
 * const theme = require('admin-bro-theme-dark')
 *
 * new AdminBro({
 *   branding: {
 *     companyName: 'John Doe Family Business',
 *     theme,
 *   }
 * })
 * ```
 *
 * @alias BrandingOptions
 * @memberof AdminBroOptions
 */
export type BrandingOptions = {
  /**
   * URL to a logo.
   */
  logo?: string;
  /**
   * Name of your company, which will replace "AdminBro".
   */
  companyName?: string;
  /**
   * CSS theme.
   */
  theme?: {
    colors?: typeof colors;
    sizes?: typeof sizes;
    fonts?: typeof fonts;
    breakpoints?: typeof breakpoints;
  };
  /**
   * Flag indicates if `SoftwareBrothers` tiny hart icon should be visible on the bottom sidebar.
   */
  softwareBrothers?: boolean;
}

export type DashboardHandler = (
  request: any,
  response: any,
  context: PageContext,
) => Promise<any>

/**
 * Interface of AdminBroOptions filled with default values
 * @private
 */
export interface AdminBroOptionsWithDefault extends AdminBroOptions {
  rootPath: string;
  logoutPath: string;
  loginPath: string;
  databases?: Array<BaseDatabase>;
  resources?: Array<BaseResource | {
    resource: BaseResource;
    options: ResourceOptions;
  }>;
  dashboard: {
    handler?: DashboardHandler;
    component?: string;
  };
  branding: BrandingOptions & {
    softwareBrothers: boolean;
    companyName: string;
  };
  assets: {
    styles: Array<string>;
    scripts: Array<string>;
    globalsFromCDN: boolean;
  };
}
