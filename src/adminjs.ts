import merge from 'lodash/merge.js'
import * as path from 'path'
import * as fs from 'fs'
import * as url from 'url'

import { AdminJSOptionsWithDefault, AdminJSOptions } from './adminjs-options.interface.js'
import BaseResource from './backend/adapters/resource/base-resource.js'
import BaseDatabase from './backend/adapters/database/base-database.js'
import ConfigurationError from './backend/utils/errors/configuration-error.js'
import ResourcesFactory from './backend/utils/resources-factory/resources-factory.js'
import componentsBundler from './backend/bundler/components.bundler.js'
import {
  RecordActionResponse,
  Action,
  BulkActionResponse,
} from './backend/actions/action.interface.js'
import { DEFAULT_PATHS } from './constants.js'
import { ACTIONS } from './backend/actions/index.js'

import loginTemplate, { LoginTemplateAttributes } from './frontend/login-template.js'
import { ListActionResponse } from './backend/actions/list/list-action.js'
import { Locale } from './locale/index.js'
import { TranslateFunctions } from './utils/translate-functions.factory.js'
import { relativeFilePathResolver } from './utils/file-resolver.js'
import { Router } from './backend/utils/index.js'
import { ComponentLoader } from './backend/utils/component-loader.js'
import { bundlePath, stylePath } from './utils/theme-bundler.js'
import generateEntry from './backend/bundler/generate-user-component-entry.js'
import { ADMIN_JS_TMP_DIR } from './backend/bundler/utils/constants.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))
export const VERSION = pkg.version

export const defaultOptions: AdminJSOptionsWithDefault = {
  rootPath: DEFAULT_PATHS.rootPath,
  logoutPath: DEFAULT_PATHS.logoutPath,
  loginPath: DEFAULT_PATHS.loginPath,
  refreshTokenPath: DEFAULT_PATHS.refreshTokenPath,
  databases: [],
  resources: [],
  dashboard: {},
  pages: {},
  bundler: {},
}

type ActionsMap = {
  show: Action<RecordActionResponse>
  edit: Action<RecordActionResponse>
  delete: Action<RecordActionResponse>
  bulkDelete: Action<BulkActionResponse>
  new: Action<RecordActionResponse>
  list: Action<ListActionResponse>
}

export type Adapter = { Database: typeof BaseDatabase; Resource: typeof BaseResource }

/**
 * Main class for AdminJS extension. It takes {@link AdminJSOptions} as a
 * parameter and creates an admin instance.
 *
 * Its main responsibility is to fetch all the resources and/or databases given by a
 * user. Its instance is a currier - injected in all other classes.
 *
 * @example
 * const AdminJS = require('adminjs')
 * const admin = new AdminJS(AdminJSOptions)
 */
class AdminJS {
  public resources: Array<BaseResource>

  public options: AdminJSOptionsWithDefault

  public locale!: Locale

  public translateFunctions!: TranslateFunctions

  public componentLoader: ComponentLoader

  /**
   * List of all default actions. If you want to change the behavior for all actions like:
   * _list_, _edit_, _show_, _delete_ and _bulkDelete_ you can do this here.
   *
   * @example <caption>Modifying accessibility rules for all show actions</caption>
   * const { ACTIONS } = require('adminjs')
   * ACTIONS.show.isAccessible = () => {...}
   */
  public static ACTIONS: ActionsMap

  /**
   * AdminJS version
   */
  public static VERSION: string

  /**
   * @param   {AdminJSOptions} options      Options passed to AdminJS
   */
  constructor(options: AdminJSOptions = {}) {
    /**
     * @type {BaseResource[]}
     * @description List of all resources available for the AdminJS.
     * They can be fetched with the {@link AdminJS#findResource} method
     */
    this.resources = []

    /**
     * @type {AdminJSOptions}
     * @description Options given by a user
     */
    this.options = merge({}, defaultOptions, options)

    this.resolveBabelConfigPath()

    const { databases, resources } = this.options

    this.componentLoader = options.componentLoader ?? new ComponentLoader()

    const resourcesFactory = new ResourcesFactory(this, global.RegisteredAdapters || [])
    this.resources = resourcesFactory.buildResources({ databases, resources })

    this.addThemeAssets()
  }

  /**
   * Registers various database adapters written for AdminJS.
   *
   * @example
   * const AdminJS = require('adminjs')
   * const MongooseAdapter = require('adminjs-mongoose')
   * AdminJS.registerAdapter(MongooseAdapter)
   *
   * @param  {Object}       options
   * @param  {typeof BaseDatabase} options.Database subclass of {@link BaseDatabase}
   * @param  {typeof BaseResource} options.Resource subclass of {@link BaseResource}
   */
  static registerAdapter({
    Database,
    Resource,
  }: {
    Database: typeof BaseDatabase
    Resource: typeof BaseResource
  }): void {
    if (!Database || !Resource) {
      throw new Error('Adapter has to have both Database and Resource')
    }

    // TODO: check if this is actually valid because "isAdapterFor" is always defined.
    // checking if both Database and Resource have at least isAdapterFor method
    // @ts-ignore
    if (Database.isAdapterFor && Resource.isAdapterFor) {
      global.RegisteredAdapters = global.RegisteredAdapters || []
      global.RegisteredAdapters.push({ Database, Resource })
    } else {
      throw new Error(
        'Adapter elements have to be a subclass of AdminJS.BaseResource and AdminJS.BaseDatabase',
      )
    }
  }

  /**
   * Initializes AdminJS instance in production. This function should be called by
   * all external plugins.
   */
  async initialize(): Promise<void> {
    if (process.env.NODE_ENV === 'production' && !(process.env.ADMIN_JS_SKIP_BUNDLE === 'true')) {
      // eslint-disable-next-line no-console
      console.log('AdminJS: bundling user components...')
      await componentsBundler.createEntry({
        content: generateEntry(this, ADMIN_JS_TMP_DIR),
      })
      await componentsBundler.build()
    }
  }

  /**
   * Watches for local changes in files imported via {@link ComponentLoader}.
   * It doesn't work on production environment.
   *
   * @return  {Promise<never>}
   */
  async watch(): Promise<string | undefined> {
    if (process.env.NODE_ENV !== 'production') {
      await componentsBundler.createEntry({
        content: generateEntry(this, ADMIN_JS_TMP_DIR),
      })
      await componentsBundler.watch()
    }
    return undefined
  }

  /**
   * Renders an entire login page with email and password fields
   * using {@link Renderer}.
   *
   * Used by external plugins
   *
   * @param  {Object} options
   * @param  {String} options.action          Login form action url - it could be
   *                                          '/admin/login'
   * @param  {String} [options.errorMessage]  Optional error message. When set,
   *                                          renderer will print this message in
   *                                          the form
   * @return {Promise<string>}                HTML of the rendered page
   */
  async renderLogin(props: LoginTemplateAttributes): Promise<string> {
    return loginTemplate(this, props)
  }

  /**
   * Returns resource base on its ID
   *
   * @example
   * const User = admin.findResource('users')
   * await User.findOne(userId)
   *
   * @param  {String} resourceId    ID of a resource defined under {@link BaseResource#id}
   * @return {BaseResource}         found resource
   * @throws {Error}                When resource with given id cannot be found
   */
  findResource(resourceId): BaseResource {
    const resource = this.resources.find((m) => m._decorated?.id() === resourceId)
    if (!resource) {
      throw new Error(
        [
          `There are no resources with given id: "${resourceId}"`,
          'This is the list of all registered resources you can use:',
          this.resources.map((r) => r._decorated?.id() || r.id()).join(', '),
        ].join('\n'),
      )
    }
    return resource
  }

  /**
   * Resolve babel config file path,
   * and load configuration to this.options.bundler.babelConfig.
   */
  resolveBabelConfigPath(): void {
    if (typeof this.options?.bundler?.babelConfig !== 'string') {
      return
    }
    let filePath = ''
    let config = this.options?.bundler?.babelConfig
    if (config[0] === '/') {
      filePath = config
    } else {
      filePath = relativeFilePathResolver(config, /new AdminJS/)
    }

    if (!fs.existsSync(filePath)) {
      throw new ConfigurationError(
        `Given babel config "${filePath}", doesn't exist.`,
        'AdminJS.html',
      )
    }
    if (path.extname(filePath) === '.js') {
      // eslint-disable-next-line
      const configModule = require(filePath)
      // eslint-disable-next-line max-len
      config = configModule && configModule.__esModule ? configModule.default || undefined : configModule
      if (!config || typeof config !== 'object' || Array.isArray(config)) {
        throw new Error(`${filePath}: Configuration should be an exported JavaScript object.`)
      }
    } else {
      try {
        config = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      } catch (err) {
        throw new Error(`${filePath}: Error while parsing config - ${err.message}`)
      }
      if (!config) throw new Error(`${filePath}: No config detected`)
      if (typeof config !== 'object') {
        throw new Error(`${filePath}: Config returned typeof ${typeof config}`)
      }
      if (Array.isArray(config)) {
        throw new Error(`${filePath}: Expected config object but found array`)
      }
    }
    this.options.bundler.babelConfig = config
  }

  addThemeAssets() {
    this.options.availableThemes?.forEach((theme) => {
      Router.assets.push({
        path: `/frontend/assets/themes/${theme.id}/theme.bundle.js`,
        src: theme.bundlePath ?? bundlePath(theme.id),
      })
      Router.assets.push({
        path: `/frontend/assets/themes/${theme.id}/style.css`,
        src: theme.stylePath ?? stylePath(theme.id),
      })
    })
  }

  private static __unsafe_componentIndex = 0

  public static __unsafe_staticComponentLoader = new ComponentLoader()
}

AdminJS.VERSION = VERSION
AdminJS.ACTIONS = ACTIONS

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminJS extends TranslateFunctions {}

export const { registerAdapter } = AdminJS

export default AdminJS
