import * as _ from 'lodash'
import * as path from 'path'
import * as fs from 'fs'

import AdminBroOptions, { AdminBroOptionsWithDefault } from './admin-bro-options.interface'
import BaseResource from './backend/adapters/base-resource'
import BaseDatabase from './backend/adapters/base-database'
import BaseRecord from './backend/adapters/base-record'
import BaseProperty from './backend/adapters/base-property'
import Filter from './backend/utils/filter'
import ValidationError from './backend/utils/validation-error'
import ConfigurationError from './backend/utils/configuration-error'
import ResourcesFactory from './backend/utils/resources-factory'
import userComponentsBunlder from './backend/bundler/user-components-bundler'
import { RouterType } from './backend/router'
import Action from './backend/actions/action.interface'
import { DEFAULT_PATHS } from './constants'

import loginTemplate from './frontend/login-template'

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))
export const VERSION = pkg.version

const defaults: AdminBroOptionsWithDefault = {
  rootPath: DEFAULT_PATHS.rootPath,
  logoutPath: DEFAULT_PATHS.logoutPath,
  loginPath: DEFAULT_PATHS.loginPath,
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
    globalsFromCDN: false,
  },
}

type ActionsMap = {[key: string]: Action }

type UserComponentsMap = {[key: string]: string}

export type Adapter = { Database: typeof BaseDatabase; Resource: typeof BaseResource }

/**
 * Main class for AdminBro extension. It takes {@link AdminBroOptions} as a
 * parameter and creates an admin instance.
 *
 * Its main responsibility is to fetch all the resources and/or databases given by a
 * user. Its instance is a currier - injected in all other classes.
 *
 * @example
 * const AdminBro = require('admin-bro')
 * const admin = new AdminBro(AdminBroOptions)
 */
class AdminBro {
  public resources: Array<BaseResource>

  public options: AdminBroOptionsWithDefault

  public static registeredAdapters: Array<Adapter>

  /**
   * Contains set of routes availables within the application.
   * It is used by external plugins.
   *
   * @example
   * const { Router } = require('admin-bro')
   * Router.routes.forEach(route => {
   *   // map your framework routes to admin-bro routes
   *   // see how `admin-bro-expressjs` plugin does it.
   * })
   */
  public static Router: RouterType

  /**
   * abstract class for all databases. External adapters have to implement that.
   */
  public static BaseDatabase: typeof BaseDatabase

  /**
   * abstract class for all records. External adapters have to implement that or at least
   * their BaseResource implementation should return records of this type.
   */
  public static BaseRecord: typeof BaseRecord

  /**
   * abstract class for all resources. External adapters have to implement that.
   */
  public static BaseResource: typeof BaseResource

  /**
   * abstract class for all properties. External adapters have to implement that or at least
   * their BaseResource implementation should return records of this type.
   */
  public static BaseProperty: typeof BaseProperty

  /**
   * Filter object passed to find method of BaseResource. External adapters have to use it
   */
  public static Filter: typeof Filter

  /**
   * Validation error which is thrown when record fails validation. External adapters have
   * to use it.
   */
  public static ValidationError: typeof ValidationError


  /**
   * List of all default actions. If you want to change behaviour for all actions lika list,
   * edit, show and delete you can do this here.
   *
   * @example <caption>Modifying accessibility rules for all show actions</caption>
   * const { ACTIONS } = require('admin-bro')
   * ACTIONS.show.isAccessible = () => {...}
   */
  public static ACTIONS: ActionsMap


  /**
   * AdminBro version
   */
  public static VERSION: string

  /**
   * List of all bundled components
   */
  public static UserComponents: UserComponentsMap

  /**
   * @param   {AdminBroOptions}  options  options passed to adminBro
   */
  constructor(options: AdminBroOptions = {}) {
    /**
     * @type {BaseResource[]}
     * @description List of all resources available for the AdminBro.
     * They can be fetched with the {@link AdminBro#findResource} method
     */
    this.resources = []

    /**
     * @type {AdminBroOptions}
     * @description Options given by a user
     */
    this.options = _.merge({}, defaults, options)

    const defaultLogo = `${this.options.rootPath}/frontend/assets/logo-mini.svg`
    this.options.branding = this.options.branding || {}
    this.options.branding.logo = this.options.branding.logo || defaultLogo
    const { databases, resources } = this.options
    const resourcesFactory = new ResourcesFactory(this, AdminBro.registeredAdapters)
    this.resources = resourcesFactory.buildResources({ databases, resources })
  }

  /**
   * Registers various database adapters written for AdminBro.
   *
   * @example
   * const AdminBro = require('admin-bro')
   * const MongooseAdapter = require('admin-bro-mongoose')
   * AdminBro.registerAdapter(MongooseAdapter)
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
   * Used by external plugins
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
   *
   * @example
   * const User = admin.findResource('users')
   * await User.findOne(userId)
   *
   * @param  {String} resourceId    ID of a resource defined under {@link BaseResource#id}
   * @return {BaseResource}         found resource
   * @throws {Error}                when resource with given id cannot be found
   */
  findResource(resourceId): BaseResource {
    const resource = this.resources.find(m => m.id() === resourceId)
    if (!resource) {
      throw new Error([
        `There are no resources with given id: "${resourceId}"`,
        'This is the list of all registered resources you can use:',
        this.resources.map(r => r.id()).join(', '),
      ].join('\n'))
    }
    return resource
  }

  /**
   * Requires given .jsx/.tsx file, that it can be bundled to the frontend.
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
    const extensions = ['.jsx', '.js', '.ts', '.tsx']
    let filePath = ''
    const componentId = _.uniqueId('Component')
    if (src[0] === '/') {
      filePath = src
    } else {
      const stack = ((new Error()).stack || '').split('\n')
      const m = stack[2].match(/\((.*):[0-9]+:[0-9]+\)/)
      if (!m) {
        throw new Error('STACK does not have a file url. Chcek out if the node version >= 8')
      }
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
AdminBro.VERSION = VERSION

export const { registerAdapter } = AdminBro
export const { bundle } = AdminBro

export default AdminBro
