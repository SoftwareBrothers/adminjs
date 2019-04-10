const _ = require('lodash')
const path = require('path')

const Renderer = require('./backend/utils/renderer')
const BaseResource = require('./backend/adapters/base-resource')
const BaseDatabase = require('./backend/adapters/base-database')
const BaseRecord = require('./backend/adapters/base-record')
const BaseProperty = require('./backend/adapters/base-property')
const PageBuilder = require('./backend/utils/page-builder')
const Filter = require('./backend/utils/filter')
const ValidationError = require('./backend/utils/validation-error')
const ResourcesFactory = require('./backend/utils/resources-factory')
const PROPERTY_TYPES = require('./backend/property-types')
const ACTIONS = require('./backend/actions')

const Router = require('./backend/router')

const pkg = require('../package.json')

/**
 * @typedef {Object} AdminBroOptions
 * @property {String} [rootPath='/admin']             under which path AdminBro will be available
 * @property {String} [logoutPath='/admin/logout']    url to a logout action
 * @property {String} [loginPath='/admin/login']      url to a login page
 * @property {BaseDatabase[]} [databases=[]]         array of all databases
 * @property {BaseResource[] | Object[]} [resources=[]] array of all resources. Resources can be
 *                                                    given in a regular way or nested within
 *                                                    an object along with its decorator
 * @property {BaseResource} [resources[].resource]    class, which extends {@link BaseResource}
 * @property {ResourceOptions} [resources[].options]  options for given resource
 * @property {PageBuilder} [dashboard]                your custom dashboard page
 * @property {Object} [branding]                      branding settings
 * @property {String} [branding.logo]                 logo shown in AdminBro in the top left corner
 * @property {String} [branding.companyName]          company name
 * @property {Boolean} [branding.softwareBrothers]    if Software Brothers logos should be shown
 *                                                    in the sidebar footer
 * @property {Object} [assets]                        assets object
 * @property {String[]}  [assets.styles]              array with a paths to styles
 * @property {String[]}  [assets.scripts]             array with a paths to scripts
 *
 * @description AdminBro takes a list of options of the entire framework. All off them
 * have default values, but you can easily tailor them to your needs
 *
 * @example
 * const AdminBro = require('admin-bro')
 *
 * const ArticleDecorator = require('./article-decorator')
 * const ArticleModel = require('./article')
 *
 * const connection = await mongoose.connect(process.env.MONGO_URL)
 *
 * const adminBro = new AdminBro({
 *   rootPath: '/xyz-admin',
 *   logoutPath: '/xyz-admin/exit',
 *   loginPath: '/xyz-admin/sign-in',
 *   databases: [connection]
 *   resources: [{ resource: ArticleModel, decorator: ArticleDecorator}]
 *   branding: {
 *     companyName: 'XYZ c.o.'
 *   },
 *   assets: {
 *     styles: ['/style.css'],
 *     scripts: ['/scripts.js']
 *   }
 * })
 */
const defaults = {
  rootPath: '/admin',
  logoutPath: '/admin/logout',
  loginPath: '/admin/login',
  databases: [],
  resources: [],
  branding: {
    logo: 'https://softwarebrothers.co/assets/images/software-brothers-logo-compact.svg',
    companyName: 'Company Name',
    softwareBrothers: true,
  },
  dashboard: {},
  assets: {
    styles: ['/style.css'],
    scripts: ['/scripts.js'],
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
  /**
   * @param  {AdminBroOptions}   options
   */
  constructor(options = {}) {
    /**
     * @type {BaseResource[]}
     * @description List of all resources available for the AdminBro
     */
    this.resources = []

    /**
     * @type {AdminBroOptions}
     * @description Options given by a user
     */
    this.options = _.merge(defaults, options)

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
    return new Renderer().render('pages/login', { action, errorMessage })
  }

  /**
   * Returns resource base on its ID
   * @param  {String} resourceId    ID of a resource defined under {@link BaseResource#id}
   * @return {BaseResource}         found resource
   */
  findResource(resourceId) {
    return this.resources.find(m => m.id() === resourceId)
  }

  static require(name, src) {
    let filePath = ''
    if (src[0] === '/') {
      filePath = src
    } else {
      const stack=((new Error).stack).split("\n")
      const m = stack[2].match(/\((.*):[0-9]+:[0-9]+\)/)
      filePath = path.join(path.dirname(m[1]), src)
    }

    AdminBro.Components[name] = filePath
    
    return name
  }
}

AdminBro.Components = {}

/**
 * List of all supported routes along with controllers
 * @type {Router}
 */
AdminBro.Router = Router

/**
 * BaseResource
 * @type {typeof BaseResource}
 */
AdminBro.BaseResource = BaseResource

/**
 * BaseDatabase
 * @type {typeof BaseDatabase}
 */
AdminBro.BaseDatabase = BaseDatabase

/**
 * BaseRecord
 * @type {typeof BaseRecord}
 */
AdminBro.BaseRecord = BaseRecord

/**
 * BaseProperty
 * @type {typeof BaseProperty}
 */
AdminBro.BaseProperty = BaseProperty

/**
 * PageBuilder
 * @type {typeof PageBuilder}
 */
AdminBro.PageBuilder = PageBuilder

/**
 * Filter
 * @type {typeof Filter}
 */
AdminBro.Filter = Filter

/**
 * ValidationError
 * @type {typeof ValidationError}
 */
AdminBro.ValidationError = ValidationError

AdminBro.registeredAdapters = []

/**
 * List of all property types supported by AdminBro
 * @type {Object<string, PropertyType>}
 */
AdminBro.PROPERTY_TYPES = PROPERTY_TYPES

/**
 * List of all Actions defined by default in AdminBro
 * @type {Object<string, Action>}
 */
AdminBro.ACTIONS = ACTIONS

AdminBro.VERSION = pkg.version

module.exports = AdminBro
