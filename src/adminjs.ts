import merge from 'lodash/merge'
import * as path from 'path'
import * as fs from 'fs'
import i18n, { i18n as I18n } from 'i18next'
import { ResourceJSON, CurrentAdmin, Locale } from '@adminjs/common/interfaces'
import { TranslateFunctions, createFunctions } from '@adminjs/common/utils'
import { DEFAULT_PATHS } from '@adminjs/common/constants'

import { AdminJSOptionsWithDefault, AdminJSOptions, AdminJSOptionsJson } from './adminjs-options.interface'
import BaseResource from './adapters/resource/base-resource'
import BaseDatabase from './adapters/database/base-database'
import ResourcesFactory from './utils/resources-factory/resources-factory'
import { RecordActionResponse, Action, BulkActionResponse } from './actions/action.interface'
import { ACTIONS } from './actions'

import { ListActionResponse } from './actions/list/list-action'
import { combineTranslations } from './locale/config'
import { locales } from './locale'

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))
export const VERSION = pkg.version

export const defaultOptions: AdminJSOptionsWithDefault = {
  paths: DEFAULT_PATHS,
  databases: [],
  resources: [],
  dashboard: {},
  pages: {},
}

type ActionsMap = {
  show: Action<RecordActionResponse>;
  edit: Action<RecordActionResponse>;
  delete: Action<RecordActionResponse>;
  bulkDelete: Action<BulkActionResponse>;
  new: Action<RecordActionResponse>;
  list: Action<ListActionResponse>;
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

  public i18n!: I18n

  public translateFunctions!: TranslateFunctions

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

  public static RegisteredAdapters: Adapter[] = []

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

    this.initI18n()

    const { databases, resources } = this.options
    const resourcesFactory = new ResourcesFactory(this, AdminJS.RegisteredAdapters || [])
    this.resources = resourcesFactory.buildResources({ databases, resources })
  }

  initI18n(): void {
    const language = this.options.locale?.language || locales.en.language
    const defaultTranslations = locales[language]?.translations || locales.en.translations
    this.locale = {
      translations: combineTranslations(defaultTranslations, this.options.locale?.translations),
      language,
    }
    if (i18n.isInitialized) {
      i18n.addResourceBundle(this.locale.language, 'translation', this.locale.translations)
    } else {
      i18n.init({
        lng: this.locale.language,
        initImmediate: false, // loads translations immediately
        resources: {
          [this.locale.language]: {
            translation: this.locale.translations,
          },
        },
      })
    }

    // mixin translate functions to AdminJS instance so users will be able to
    // call AdminJS.translateMessage(...)
    this.translateFunctions = createFunctions(i18n)
    Object.getOwnPropertyNames(this.translateFunctions).forEach((translateFunctionName) => {
      this[translateFunctionName] = this.translateFunctions[translateFunctionName]
    })
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
  static registerAdapter({ Database, Resource }: {
    Database: typeof BaseDatabase;
    Resource: typeof BaseResource;
  }): void {
    if (!Database || !Resource) {
      throw new Error('Adapter has to have both Database and Resource')
    }

    // TODO: check if this is actually valid because "isAdapterFor" is always defined.
    // checking if both Database and Resource have at least isAdapterFor method
    // @ts-ignore
    if (Database.isAdapterFor && Resource.isAdapterFor) {
      AdminJS.RegisteredAdapters = AdminJS.RegisteredAdapters || []
      AdminJS.RegisteredAdapters.push({ Database, Resource })
    } else {
      throw new Error('Adapter elements have to be a subclass of AdminJS.BaseResource and AdminJS.BaseDatabase')
    }
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
  // eslint-disable-next-line class-methods-use-this
  async renderLogin({ action, errorMessage }): Promise<string | null> {
    // todo: allow serving login
    // return loginTemplate(this, { action, errorMessage })
    return null
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
      throw new Error([
        `There are no resources with given id: "${resourceId}"`,
        'This is the list of all registered resources you can use:',
        this.resources.map((r) => r._decorated?.id() || r.id()).join(', '),
      ].join('\n'))
    }
    return resource
  }

  async toJSON(currentAdmin?: CurrentAdmin): Promise<AdminJSOptionsJson> {
    let jsonResources: ResourceJSON[] = []
    try {
      jsonResources = this.resources.map((r) => r.decorate().toJSON(currentAdmin))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
    const branding = typeof this.options.branding === 'function'
      ? await this.options.branding(currentAdmin)
      : this.options.branding
    const pages = Object.entries(this.options.pages ?? {})
      .map(([key, info]) => ({
        name: key,
        label: info.label ?? key,
        component: info.component,
      }))

    return {
      resources: jsonResources,
      paths: this.options.paths,
      branding: branding ?? {},
      locale: this.locale,
      pages,
    }
  }
}

AdminJS.RegisteredAdapters = []
AdminJS.VERSION = VERSION
AdminJS.ACTIONS = ACTIONS

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminJS extends TranslateFunctions {}

export const { registerAdapter } = AdminJS

export default AdminJS
