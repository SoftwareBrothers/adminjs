import * as _ from 'lodash'
import * as path from 'path'
import * as fs from 'fs'

import AdminBroOptions from './admin-bro-options.interface'
import BaseResource from './backend/adapters/base-resource'
import BaseDatabase from './backend/adapters/base-database'
import BaseRecord from './backend/adapters/base-record'
import BaseProperty from './backend/adapters/base-property'
import Filter from './backend/utils/filter'
import ValidationError from './backend/utils/validation-error'
import ConfigurationError from './backend/utils/configuration-error'
import ResourcesFactory from './backend/utils/resources-factory'
import userComponentsBunlder from './backend/bundler/user-components-bundler'
import Router, { RouterType } from './backend/router'
import Action from './backend/actions/action.interface'

import loginTemplate from './frontend/login-template'

import * as ACTIONS from './backend/actions'

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))

const defaults: AdminBroOptions = {
  rootPath: '/admin',
  logoutPath: '/admin/logout',
  loginPath: '/admin/login',
  databases: [],
  resources: [],
  branding: {
    companyName: 'Company',
    softwareBrothers: true,
  },
  dashboard: {},
  assets: {
    styles: [],
    scripts: [],
    globalsFromCDN: true,
  },
}

export type Adapter = { Database: typeof BaseDatabase; Resource: typeof BaseResource }

/**
 * Main class for AdminBro extension. It takes {@link AdminBroOptions} as a
 * parameter and creates an admin instance.
 *
 * Its main responsibility is to fetch all the resources and/or databases given by a
 * user. Its instance is a currier - injected in all other classes.
 *
 * @example
 * const { AdminBro } = require('admin-bro')
 * const admin = new AdminBro(AdminBroOptions)
 *
 */
class AdminBro {
  public resources: Array<BaseResource>

  public options: AdminBroOptions

  public static registeredAdapters: Array<Adapter>

  public static Router: RouterType

  public static BaseDatabase: BaseDatabase

  public static BaseRecord: BaseRecord

  public static BaseProperty: BaseProperty

  public static Filter: Filter

  public static ValidationError: ValidationError

  public static ACTIONS: Map<string, Action>

  public static VERSION: string

  public static UserComponents: Map<string, string> | {}

  /**
   * @param   {AdminBroOptions}  options  options passed to adminBro
   */
  constructor(options: AdminBroOptions = {}) {
    /**
     * @type {BaseResource[]}
     * @description List of all resources available for the AdminBro
     */
    this.resources = []

    /**
     * @type {AdminBroOptions}
     * @description Options given by a user
     */
    this.options = _.merge({}, defaults, options)

    this.options.branding.logo = this.options.branding.logo || `${this.options.rootPath}/frontend/assets/logo-mini.svg`

    const { databases, resources } = this.options
    const resourcesFactory = new ResourcesFactory(this, AdminBro.registeredAdapters)
    this.resources = resourcesFactory.buildResources({ databases, resources })
  }

  /**
   * Registers various database adapters written for AdminBro
   *
   * @param  {Object}       options
   * @param  {typeof BaseDatabase} options.Database subclass of BaseDatabase
   * @param  {typeof BaseResource} options.Resource subclass of BaseResource
   */
  static registerAdapter({ Database, Resource }: {
    Database: typeof BaseDatabase;
    Resource: typeof BaseResource;
  }): void {
    if (!Database || !Resource) {
      throw new Error('Adapter has to have both Database and Resource')
    }
    // checking if both Database and Resource have at least isAdapterFor method
    if (Database.isAdapterFor && Resource.isAdapterFor) {
      AdminBro.registeredAdapters.push({ Database, Resource })
    } else {
      throw new Error('Adapter elements has to be subclassess of AdminBro.BaseResource and AdminBro.BaseDatabase')
    }
  }

  /**
   * Initializes AdminBro instance in production. This function should be called by
   * all external plugins.
   */
  async initialize(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      console.log('AdminBro: bundling user components...')
      await userComponentsBunlder(this, { write: true })
    }
  }

  /**
   * Renders an entire login page with email and password fields
   * using {@link Renderer}.
   *
   * @param  {Object} options
   * @param  {String} options.action          login form action url - it could be
   *                                          '/admin/login'
   * @param  {String} [options.errorMessage]  optional error message. When set,
   *                                          renderer will print this message in
   *                                          the form
   * @return {Promise<string>}                HTML of the rendered page
   */
  static async renderLogin({ action, errorMessage }): Promise<string> {
    return loginTemplate({ action, errorMessage })
  }

  /**
   * Returns resource base on its ID
   * @param  {String} resourceId    ID of a resource defined under {@link BaseResource#id}
   * @return {BaseResource}         found resource
   */
  findResource(resourceId): BaseResource {
    return this.resources.find(m => m.id() === resourceId)
  }

  /**
   * Requires given jsx file, that it can be bundled to the frontend.
   * It will be available under AdminBro.UserComponents[componentId].
   *
   * @param   {String}  src  path to a file containing react component.
   *
   * @return  {String}       componentId - uniq id of a component
   *
   * @example
   * const adminBroOptions = {
   *   dashboard: {
   *     component: AdminBro.bundle('./path/to/component'),
   *   }
   * }
   */
  public static bundle(src: string): string {
    const extensions = ['.jsx', '.js']
    let filePath = ''
    const componentId = _.uniqueId('Component')
    if (src[0] === '/') {
      filePath = src
    } else {
      const stack = ((new Error()).stack).split('\n')
      const m = stack[2].match(/\((.*):[0-9]+:[0-9]+\)/)
      filePath = path.join(path.dirname(m[1]), src)
    }

    const { root, dir, name } = path.parse(filePath)
    if (!extensions.find((ext) => {
      const fileName = path.format({ root, dir, name, ext })
      return fs.existsSync(fileName)
    })) {
      throw new ConfigurationError(`Given file "${src}", doesn't exist.`, 'AdminBro.html')
    }

    AdminBro.UserComponents[componentId] = path.format({ root, dir, name })

    return componentId
  }
}

AdminBro.UserComponents = {}
AdminBro.registeredAdapters = []

export const { registerAdapter } = AdminBro
export const { bundle } = AdminBro
export const VERSION = pkg.version

export {
  AdminBro,
  BaseProperty,
  BaseResource,
  Router,
  BaseDatabase,
  BaseRecord,
  Filter,
  ValidationError,
  ACTIONS,
}
