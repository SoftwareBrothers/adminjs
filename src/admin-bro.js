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

const pkg = require('../package.json')

/**
 * @typedef {Object} AdminBroOptions
 * @property {String} [rootPath='/admin']             under which path AdminBro will be available
 * @property {String} [logoutPath='/admin/logout']    url to a logout action
 * @property {String} [loginPath='/admin/login']      url to a login page
 * @property {BaseDatabase[]} [databases=[]]          array of all databases
 * @property {Object[]} [resources=[]]                array of all database resources.
 *                                                    Resources can be given directly or
 *                                                    nested within an object along with its
 *                                                    options
 * @property {BaseResource} [resources[].resource]    class, which extends {@link BaseResource}
 * @property {ResourceOptions} [resources[].options]  options for given resource
 * @property {Object} [dashboard]                     your custom dashboard page
 * @property {BaseAction.handler} [dashboard.handler] action handler which will override default
 *                                                    dashboard handler - you can perform actions
 *                                                    on the backend there and pass results to
 *                                                    component
 * @property {Component} [dashboard.component]        Component which will be rendered on the
 *                                                    dashboard
 * @property {Object} [version]                      sets the versions visibility
 * @property {Boolean} [version.admin]               if set to true, shows current AdminBro version
 * @property {String} [version.app]                  if set, shows this version in the UI
 * @property {Object} [branding]                      branding settings
 * @property {String} [branding.logo]                 logo shown in AdminBro in the top left corner
 * @property {String} [branding.companyName]          company name
 * @property {Object} [branding.theme]                override custom css properties as colors
 *                                                    and paddings. See
 *                        <a href='/admin-bro_src_frontend_styles_variables.js.html'>This file</a>
 *                                                    example: `colors: {primary: 'red'}`
 * @property {Boolean} [branding.softwareBrothers]    if Software Brothers logos should be shown
 *                                                    in the sidebar footer
 * @property {Object} [assets]                        assets object
 * @property {String[]}  [assets.styles]              array with a paths to styles
 * @property {String[]}  [assets.scripts]             array with a paths to scripts
 * @property {String[]}  [assets.globalsFromCDN=true] indicates if globals like React, ReactDOM etc.
 *                                                    should be taken from CDNs. If set to false,
 *                                                    local bundle file will be used (makes sense
 *                                                    with slower internet connection)
 * @property {Object<String,String>} [env]            environmental variables passed to the frontend
 *
 * @description AdminBro takes a list of options of the entire framework. All off them
 * have default values, but you can easily tailor them to your needs
 *
 * @example
 * const AdminBro = require('admin-bro')
 * //...
 * const adminBro = new AdminBro({
 *   rootPath: '/xyz-admin',
 *   logoutPath: '/xyz-admin/exit',
 *   loginPath: '/xyz-admin/sign-in',
 *   databases: [connection]
 *   resources: [{ resource: ArticleModel, options: {...}}]
 *   branding: {
 *     companyName: 'XYZ c.o.'
 *   },
 * })
 * //...
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
   *     component: AdminBro.require('./path/to/component'),
   *   }
   * }
   */
  static require(src) {
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

/**
 * List of paths to all custom components defined by users.
 * @type {Object<String, String>}
 */
AdminBro.UserComponents = {}

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
 * List of all Actions defined by default in AdminBro
 * @type {Object<string, Action>}
 */
AdminBro.ACTIONS = ACTIONS

AdminBro.VERSION = pkg.version

module.exports = AdminBro
