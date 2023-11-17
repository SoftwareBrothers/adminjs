import { ThemeOverride } from '@adminjs/design-system'
import type { TransformOptions as BabelConfig } from 'babel-core'

import AdminJS from './adminjs.js'
import BaseResource from './backend/adapters/resource/base-resource.js'
import BaseDatabase from './backend/adapters/database/base-database.js'
import { PageContext } from './backend/actions/action.interface.js'
import { ResourceOptions } from './backend/decorators/resource/resource-options.interface.js'
import { Locale } from './locale/config.js'
import { CurrentAdmin } from './current-admin.interface.js'
import { CoreScripts } from './core-scripts.interface.js'
import { ComponentLoader } from './backend/utils/component-loader.js'

/**
 * AdminJSOptions
 *
 * This is the heart of entire AdminJS - all options resides here.
 *
 * ### Usage with regular javascript
 *
 * ```javascript
 * const AdminJS = require('adminjs')
 * //...
 * const adminJS = new AdminJS({
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
 * import { AdminJSOptions } from 'adminjs'
 *
 * const options: AdminJSOptions = {
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
 * const adminJs = new AdminJS(options)
 * ```
 */
export interface AdminJSOptions {
  /**
   * path, under which, AdminJS will be available. Default to `/admin`
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
   * Array of all Databases which are supported by AdminJS via adapters
   */
  databases?: Array<any>;

  componentLoader?: ComponentLoader;

  /**
   * List of custom pages which will be visible below all resources
   * @example
   * pages: {
   *   customPage: {
   *     label: "Custom page",
   *     handler: async (request, response, context) => {
   *       return {
   *         text: 'I am fetched from the backend',
   *       }
   *     },
   *     component: 'CustomPage',
   *   },
   *   anotherPage: {
   *     label: "TypeScript page",
   *     component: 'TestComponent',
   *   },
   * },
   */
  pages?: AdminPages;
  /**
   * Array of all Resources which are supported by AdminJS via adapters.
   * You can pass either resource or resource with an options and thus modify it.
   * @property {any} resources[].resource
   * @property {ResourceOptions} resources[].options
   * @property {Array<FeatureType>} resources[].features
   *
   * @see ResourceOptions
   */
  resources?: Array<ResourceWithOptions | any>;
  /**
   * Option to modify the dashboard
   */
  dashboard?: {
    /**
     * Handler function which can be triggered using {@link ApiClient#getDashboard}.
     */
    handler?: PageHandler;
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
  branding?: BrandingOptions | BrandingOptionsFunction;
  /**
   * Custom assets you want to pass to AdminJS
   */
  assets?: Assets | AssetsFunction;
  /**
   * Indicates is bundled by AdminJS files like:
   * - components.bundle.js
   * - global.bundle.js
   * - design-system.bundle.js
   * - app.bundle.js
   * should be taken from the same server as other AdminJS routes (default)
   * or should be taken from an external CDN.
   *
   * If set - bundles will go from given CDN if unset - from the same server.
   *
   * When you can use this option? So let's say you want to deploy the app on
   * serverless environment like Firebase Cloud Functions. In that case you don't
   * want to serve static files with the same app because your function will be
   * invoked every time frontend asks for static assets.
   *
   * Solution would be to:
   * - create `public` folder in your app
   * - generate `bundle.js` file to `.adminjs/` folder by using {@link AdminJS#initialize}
   * function (with process.env.NODE_ENV set to 'production').
   * - copy the before mentioned file to `public` folder and rename it to
   * components.bundle.js
   * - copy
   * './node_modules/adminjs/lib/frontend/assets/scripts/app-bundle.production.js' to
   * './public/app.bundle.js',
   * - copy
   * './node_modules/adminjs/lib/frontend/assets/scripts/global-bundle.production.js' to
   * './public/global.bundle.js'
   * * - copy
   * './node_modules/adminjs/node_modules/@adminjs/design-system/bundle.production.js' to
   * './public/design-system.bundle.js'
   * - host entire public folder under some domain (if you use firebase - you can host them
   * with firebase hosting)
   * - point {@link AdminJS.assetsCDN} to this domain
   */
  assetsCDN?: string;
  /**
   * Environmental variables passed to the frontend.
   *
   * So let say you want to pass some _GOOGLE_MAP_API_TOKEN_ to the frontend.
   * You can do this by adding it here:
   *
   * ```javascript
   * new AdminJS({env: {
   *   GOOGLE_MAP_API_TOKEN: 'my-token',
   * }})
   * ```
   *
   * and this token will be available on the frontend by using:
   *
   * ```javascript
   * AdminJS.env.GOOGLE_MAP_API_TOKEN
   * ```
   */
  env?: Record<string, string>;

  /**
   * Translations
   *
   * Change it in order to:
   * - localize admin panel
   * - change any arbitrary text in the UI
   *
   * This is the example for changing name of a couple of resources along with some
   * properties to Polish. You can also use this technic to change any text even in english.
   * So to change button label of a "new action" from default "Create new" to "Create new Comment"
   * only for Comment resource, place it in action section.
   *
   * ```javascript
   * {
   *  locale: {
   *    translations: {
   *      pl: {
   *        labels: {
   *          Comments: "Komentarze",
   *        },
   *        resources: {
   *          Comments: {
   *            properties: {
   *              name: "Nazwa Komentarza",
   *              content: "Zawartość",
   *            },
   *            actions: {
   *             new: 'Create new Comment'
   *           }
   *          }
   *        }
   *      }
   *    }
   *  }
   *}
   * ```
   *
   * Check out the [i18n tutorial]{@tutorial i18n} to see how
   * internationalization in AdminJS works.
   */
  locale?: Locale | ((admin?: CurrentAdmin) => Locale | Promise<Locale>);

  /**
   * rollup bundle options;
   */
  bundler?: BundlerOptions;

  /**
   * Additional settings.
   */
  settings?: Partial<AdminJSSettings>;

  /**
   * List of available themes, for example exports of the `@adminjs/themes` npm package.
   */
  availableThemes?: ThemeConfig[];

  /**
   * ID of the default theme. If not provided, the first theme from the `availableThemes`
   * list will be used.
   */
  defaultTheme?: string;
}

export type ThemeConfig = {
  id: string,
  name: string,
  overrides: Partial<ThemeOverride>;
  bundlePath?: string;
  stylePath?: string;
}

export type AdminJSSettings = {
  defaultPerPage: number;
};

/* cspell: enable */

/**
 * @memberof AdminJSOptions
 * @alias Assets
 *
 * Optional assets (stylesheets, and javascript libraries) which can be
 * appended to the HEAD of the page.
 *
 * you can also pass {@link AssetsFunction} instead.
 */
export type Assets = {
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
   *  Mapping of core scripts in case you want to version your assets
   */
  coreScripts?: CoreScripts;
};

/**
 * @alias AssetsFunction
 * @name AssetsFunction
 * @memberof AdminJSOptions
 * @returns {Assets | Promise<Assets>}
 * @description
 * Function returning {@link Assets}
 */
export type AssetsFunction = (admin?: CurrentAdmin) => Assets | Promise<Assets>;

/**
 * Version Props
 * @alias VersionProps
 * @memberof AdminJSOptions
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
};

export type VersionProps = {
  admin?: string;
  app?: string;
};

/**
 * Branding Options
 *
 * You can use them to change how AdminJS looks. For instance to change name and
 * colors (dark theme) run:
 *
 * ```javascript
 * new AdminJS({
 *   branding: {
 *     companyName: 'John Doe Family Business',
 *     theme,
 *   }
 * })
 * ```
 *
 * @alias BrandingOptions
 * @memberof AdminJSOptions
 */
export type BrandingOptions = {
  /**
   * URL to a logo, or `false` if you want to hide the default one.
   */
  logo?: string | false;
  /**
   * Name of your company, which will replace "AdminJS".
   */
  companyName?: string;
  /**
   * CSS theme.
   */
  theme?: Partial<ThemeOverride>;
  /**
   * Flag indicates if "made with love" tiny heart icon
   * should be visible on the bottom sidebar and login page.
   * @new since 6.0.0
   */
  withMadeWithLove?: boolean;

  /**
   * URL to a favicon
   */
  favicon?: string;
};

/**
 * Branding Options Function
 *
 * function returning BrandingOptions.
 *
 * @alias BrandingOptionsFunction
 * @memberof AdminJSOptions
 * @returns {BrandingOptions | Promise<BrandingOptions>}
 */
export type BrandingOptionsFunction = (
  admin?: CurrentAdmin,
) => BrandingOptions | Promise<BrandingOptions>;

/**
 * Object describing regular page in AdminJS
 *
 * @alias AdminPage
 * @memberof AdminJSOptions
 */
export type AdminPage = {
  /**
   * Handler function
   */
  handler?: PageHandler;
  /**
   * Component defined by using {@link ComponentLoader}
   */
  component: string;

  /**
   * Page icon
   */
  icon?: string;
};

/**
 * Object describing map of regular pages in AdminJS
 *
 * @alias AdminPages
 * @memberof AdminJSOptions
 */
export type AdminPages = Record<string, AdminPage>;

/**
 * Default way of passing Options with a Resource
 * @alias ResourceWithOptions
 * @memberof AdminJSOptions
 */
export type ResourceWithOptions = {
  resource: any;
  options: ResourceOptions;
  features?: Array<FeatureType>;
};

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
   * AdminJS instance
   */
  admin: AdminJS,
  /**
   * Options returned by the feature added before
   */
  options: ResourceOptions,
) => ResourceOptions;

/**
 * Function which is invoked when user enters given AdminPage
 *
 * @alias PageHandler
 * @memberof AdminJSOptions
 */
export type PageHandler = (request: any, response: any, context: PageContext) => Promise<any>;

/**
 * Bundle options
 *
 * @alias BundlerOptions
 * @memberof AdminJSOptions
 * @example
 * const adminJS = new AdminJS({
    resources: [],
    rootPath: '/admin',
    babelConfig: './.adminJS.babelrc'
   })
 */
export type BundlerOptions = {
  /**
   * The file path to babel config file or json object of babel config.
   */
  babelConfig?: BabelConfig | string;
};

export interface AdminJSOptionsWithDefault extends AdminJSOptions {
  rootPath: string;
  logoutPath: string;
  loginPath: string;
  refreshTokenPath: string;
  databases?: Array<BaseDatabase>;
  resources?: Array<
    | BaseResource
    | {
        resource: BaseResource;
        options: ResourceOptions;
      }
  >;
  dashboard: {
    handler?: PageHandler;
    component?: string;
  };
  bundler: BundlerOptions;
  pages: AdminJSOptions['pages'];
}
