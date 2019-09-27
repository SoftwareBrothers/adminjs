import AdminBroOptions from './admin-bro-options.interface'

const _ = require('lodash')
const path = require('path')
const fs = require('fs')

const loginTemplate = require('./frontend/login-template')
const BaseResource = require('./backend/adapters/base-resource')
const BaseDatabase = require('./backend/adapters/base-database')
const BaseRecord = require('./backend/adapters/base-record')
const BaseProperty = require('./backend/adapters/base-property')
const Filter = require('./backend/utils/filter')
const ValidationError = require('./backend/utils/validation-error')
const ConfigurationError = require('./backend/utils/configuration-error')
const ResourcesFactory = require('./backend/utils/resources-factory')
const userComponentsBunlder = require('./backend/bundler/user-components-bundler')
const ACTIONS = require('./backend/actions')

const Router = require('./backend/router')

const pkg = require('../../package.json')

/**
 * @typedef {Object} CurrentAdmin
 * @property {String} email         email address
 * @description
 * Currently logged in admin user.
 */

const defaults = {
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

/**
 * Main class for AdminBro extension. It takes {@link AdminBroOptions} as a
 * parameter and creates an admin instance.
 *
 * Its main responsibility is to fetch all the resources and/or databases given by a
 * user. Its instance is a currier - injected in all other classes.
 */
class AdminBro {
  public resources: Array<BaseResource>
  public options: AdminBroOptions
  public static registeredAdapters: Array<{ Database: BaseDatabase, Resource: BaseResource }>
  public static Router: Router
  public static BaseDatabase: BaseDatabase
  public static BaseRecord: BaseRecord
  public static BaseProperty: BaseProperty
  public static Filter: Filter
  public static ValidationError: ValidationError
  public static ACTIONS: Map<String, Action>
  public static VERSION: string
  public static UserComponents: Map<String, String> | {}

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
  static registerAdapter({ Database, Resource }) {
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
  async initialize() {
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
  static async renderLogin({ action, errorMessage }) {
    return loginTemplate({ action, errorMessage })
  }

  /**
   * Returns resource base on its ID
   * @param  {String} resourceId    ID of a resource defined under {@link BaseResource#id}
   * @return {BaseResource}         found resource
   */
  findResource(resourceId) {
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
  public static bundle(src: string) {
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

/**
 * List of all Actions defined by default in AdminBro
 * @type {Object<string, Action>}
 */
AdminBro.ACTIONS = ACTIONS

AdminBro.VERSION = pkg.version

export let registerAdapter = AdminBro.registerAdapter
export let bundle = AdminBro.bundle

export {
  AdminBro,
  /**
   * BaseProperty
   * @memberof AdminBro
   * @type {typeof BaseProperty}
   */
  BaseProperty,
  
  /**
   * BaseResource
   * @type {typeof BaseResource}
   */
  BaseResource,

  /**
   * List of all supported routes along with controllers
   * @type {Router}
   */
  Router,

  /**
   * BaseDatabase
   * @type {typeof BaseDatabase}
   */
  BaseDatabase,

  /**
   * BaseRecord
   * @type {typeof BaseRecord}
   */
  BaseRecord,

  /**
   * Filter
   * @type {typeof Filter}
   */
  Filter,

  /**
   * ValidationError
   * @type {typeof ValidationError}
   */
  ValidationError,
}

