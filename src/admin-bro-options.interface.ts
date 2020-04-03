import BaseResource from './backend/adapters/base-resource'
import BaseDatabase from './backend/adapters/base-database'
import { PageContext } from './backend/actions/action.interface'
import { ResourceOptions } from './backend/decorators/resource-options.interface'
import { colors, sizes, font, fontSizes, fontWeights, space, lineHeights } from './frontend/styles/variables'
import { NonNullishPartialRecord } from './utils/non-nullish-partial-record.type'
import { Locale } from './locale/config'

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
   * Array of all Databases which are supported by AdminBro via adapters
   */
  databases?: Array<any>;

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
   *     component: AdminBro.bundle('./components/some-stats'),
   *   },
   *   anotherPage: {
   *     label: "TypeScript page",
   *     component: AdminBro.bundle('./components/test-component'),
   *   },
   * },
   */
  pages?: Record<string, AdminPage>;
  /**
   * Array of all Resources which are supported by AdminBro via adapters.
   * You can pass either resource or resource with an options and thus modify it.
   * @property {any} resources[].resource
   * @property {ResourceOptions} resources[].options
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
  };
  /**
   * Indicates is bundled by AdminBro files like:
   * - components.bundle.js
   * - global.bundle.js
   * - app.bundle.js
   * should be taken from the same server as other AdminBro routes (default)
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
   * - generate `bundle.js` file to `.adminbro/` folder by using {@link AdminBro#initialize}
   * function (with process.env.NODE_ENV set to 'production').
   * - copy the before mentioned file to `public` folder and rename it to
   * components.bundle.js
   * - copy
   * './node_modules/admin-bro/lib/frontend/assets/scripts/app-bundle.production.js' to
   * './public/app.bundle.js',
   * - copy
   * './node_modules/admin-bro/lib/frontend/assets/scripts/global-bundle.production.js' to
   * './public/global.bundle.js'
   * - host entire public folder under some domain (if you use firebase - you can host them
   * with firebase hosting)
   * - point {@link AdminBro.assetsCDN} to this domain
   */
  assetsCDN?: string;
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
   * AdminBro.env.GOOGLE_MAP_API_TOKEN
   * ```
   */
  env?: Record<string, string>;

  /* cspell: disable */

  /**
   * Translation file. Change it in order to:
   * - localize admin panel
   * - change any arbitrary text in the UI
   *
   * This is the example for changing name of a couple of resources along with some
   * properties to Polish
   *
   * ```javascript
   * {
   *   ...
   *   locale: {
   *     language: 'pl',
   *     translations: {
   *       labels: {
   *         Comments: 'Komentarze',
   *       }
   *       resources: {
   *         Comments: {
   *           properties: {
   *             name: 'Nazwa Komentarza',
   *             content: 'Zawartość',
   *           }
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   *
   * As I mentioned you can use this technic to change any text even in english.
   * So to change button label for a "new action" from default "Create new" to "Create new Comment"
   * only for Comment resource you can do:
   *
   * ```javascript
   * {
   *   ...
   *   locale: {
   *     translations: {
   *       resources: {
   *         Comments: {
   *           actions: {
   *             new: 'Create new Comment',
   *           }
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   *
   * Check out the [i18n tutorial]{@tutorial 09-i18n} to see how
   * internationalization in AdminBro works.
   */
  locale?: Locale;
}

/* cspell: enable */

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

export type Theme = {
  colors: NonNullishPartialRecord<typeof colors>;
  sizes: NonNullishPartialRecord<typeof sizes>;
  space: NonNullishPartialRecord<typeof space>;
  fontSizes: NonNullishPartialRecord<typeof fontSizes>;
  lineHeights: NonNullishPartialRecord<typeof lineHeights>;
  fontWeights: NonNullishPartialRecord<typeof fontWeights>;
  font: NonNullishPartialRecord<typeof font>;
};

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
   * URL to a logo, or `false` if you want to hide the default one.
   */
  logo?: string | false;
  /**
   * Name of your company, which will replace "AdminBro".
   */
  companyName?: string;
  /**
   * CSS theme.
   */
  theme?: Partial<Theme>;
  /**
   * Flag indicates if `SoftwareBrothers` tiny hart icon should be visible on the bottom sidebar.
   */
  softwareBrothers?: boolean;

  /**
   * URL to a favicon
   */
  favicon?: string;
}

/**
 * Object describing regular page in AdminBro
 *
 * @alias AdminPage
 * @memberof AdminBroOptions
 */
export type AdminPage = {
  /**
   * Handler function
   */
  handler?: PageHandler;
  /**
   * Component defined by using {@link AdminBro.bundle}
   */
  component: string;
}

/**
 * Default way of passing Options with a Resource
 * @alias ResourceWithOptions
 * @memberof AdminBroOptions
 */
export type ResourceWithOptions = {
  resource: any;
  options: ResourceOptions;
}

/**
 * Function which is invoked when user enters given AdminPage
 *
 * @alias PageHandler
 * @memberof AdminBroOptions
 */
export type PageHandler = (
  request: any,
  response: any,
  context: PageContext,
) => Promise<any>

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
    handler?: PageHandler;
    component?: string;
  };
  branding: BrandingOptions & Required<Pick<BrandingOptions, 'softwareBrothers' | 'companyName'>>;
  assets: {
    styles: Array<string>;
    scripts: Array<string>;
  };
  pages: Record<string, AdminPage>;
}
