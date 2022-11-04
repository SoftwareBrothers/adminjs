"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerAdapter = exports.defaultOptions = exports.default = exports.bundle = exports.VERSION = void 0;
var _ = _interopRequireWildcard(require("lodash"));
var path = _interopRequireWildcard(require("path"));
var fs = _interopRequireWildcard(require("fs"));
var _i18next = _interopRequireDefault(require("i18next"));
var _configurationError = _interopRequireDefault(require("./backend/utils/errors/configuration-error"));
var _resourcesFactory = _interopRequireDefault(require("./backend/utils/resources-factory/resources-factory"));
var _userComponentsBundler = _interopRequireDefault(require("./backend/bundler/user-components-bundler"));
var _constants = require("./constants");
var _actions = require("./backend/actions");
var _loginTemplate = _interopRequireDefault(require("./frontend/login-template"));
var _config = require("./locale/config");
var _locale = require("./locale");
var _translateFunctions = require("./utils/translate-functions.factory");
var _fileResolver = require("./utils/file-resolver");
var _utils = require("./backend/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
const VERSION = pkg.version;
exports.VERSION = VERSION;
const defaultOptions = {
  rootPath: _constants.DEFAULT_PATHS.rootPath,
  logoutPath: _constants.DEFAULT_PATHS.logoutPath,
  loginPath: _constants.DEFAULT_PATHS.loginPath,
  databases: [],
  resources: [],
  dashboard: {},
  pages: {},
  bundler: {}
};
exports.defaultOptions = defaultOptions;
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
  /**
   * List of all default actions. If you want to change the behavior for all actions like:
   * _list_, _edit_, _show_, _delete_ and _bulkDelete_ you can do this here.
   *
   * @example <caption>Modifying accessibility rules for all show actions</caption>
   * const { ACTIONS } = require('adminjs')
   * ACTIONS.show.isAccessible = () => {...}
   */

  /**
   * AdminJS version
   */

  /**
   * Login override
   */

  /**
   * @param   {AdminJSOptions} options      Options passed to AdminJS
   */
  constructor(options = {}) {
    /**
     * @type {BaseResource[]}
     * @description List of all resources available for the AdminJS.
     * They can be fetched with the {@link AdminJS#findResource} method
     */
    this.resources = [];

    /**
     * @type {AdminJSOptions}
     * @description Options given by a user
     */
    this.options = _.merge({}, defaultOptions, options);
    this.resolveBabelConfigPath();
    this.initI18n();
    const {
      databases,
      resources
    } = this.options;
    const resourcesFactory = new _resourcesFactory.default(this, global.RegisteredAdapters || []);
    this.resources = resourcesFactory.buildResources({
      databases,
      resources
    });
  }
  initI18n() {
    var _this$options$locale, _locales$language, _this$options$locale2;
    const language = ((_this$options$locale = this.options.locale) === null || _this$options$locale === void 0 ? void 0 : _this$options$locale.language) || _locale.locales.en.language;
    const defaultTranslations = ((_locales$language = _locale.locales[language]) === null || _locales$language === void 0 ? void 0 : _locales$language.translations) || _locale.locales.en.translations;
    this.locale = {
      translations: (0, _config.combineTranslations)(defaultTranslations, (_this$options$locale2 = this.options.locale) === null || _this$options$locale2 === void 0 ? void 0 : _this$options$locale2.translations),
      language
    };
    if (_i18next.default.isInitialized) {
      _i18next.default.addResourceBundle(this.locale.language, 'translation', this.locale.translations);
    } else {
      _i18next.default.init({
        lng: this.locale.language,
        initImmediate: false,
        // loads translations immediately
        resources: {
          [this.locale.language]: {
            translation: this.locale.translations
          }
        }
      });
    }

    // mixin translate functions to AdminJS instance so users will be able to
    // call AdminJS.translateMessage(...)
    this.translateFunctions = (0, _translateFunctions.createFunctions)(_i18next.default);
    Object.getOwnPropertyNames(this.translateFunctions).forEach(translateFunctionName => {
      this[translateFunctionName] = this.translateFunctions[translateFunctionName];
    });
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
    Resource
  }) {
    if (!Database || !Resource) {
      throw new Error('Adapter has to have both Database and Resource');
    }

    // TODO: check if this is actually valid because "isAdapterFor" is always defined.
    // checking if both Database and Resource have at least isAdapterFor method
    // @ts-ignore
    if (Database.isAdapterFor && Resource.isAdapterFor) {
      global.RegisteredAdapters = global.RegisteredAdapters || [];
      global.RegisteredAdapters.push({
        Database,
        Resource
      });
    } else {
      throw new Error('Adapter elements have to be a subclass of AdminJS.BaseResource and AdminJS.BaseDatabase');
    }
  }

  /**
   * Initializes AdminJS instance in production. This function should be called by
   * all external plugins.
   */
  async initialize() {
    if (process.env.NODE_ENV === 'production' && !(process.env.ADMIN_JS_SKIP_BUNDLE === 'true')) {
      // eslint-disable-next-line no-console
      console.log('AdminJS: bundling user components...');
      await (0, _userComponentsBundler.default)(this, {
        write: true
      });
    }
  }

  /**
   * Watches for local changes in files imported via {@link AdminJS.bundle}.
   * It doesn't work on production environment.
   *
   * @return  {Promise<never>}
   */
  async watch() {
    if (process.env.NODE_ENV !== 'production') {
      return (0, _userComponentsBundler.default)(this, {
        write: true,
        watch: true
      });
    }
    return undefined;
  }

  /**
   * Allows you to override the default login view by providing your React components
   * and custom props.
   *
   * @param  {Object} options
   * @param  {String} options.component       Custom React component
   * @param  {String} [options.props]         Props to be passed to React component
   * @return {Promise<void>}
   */
  overrideLogin({
    component,
    props
  }) {
    this.loginOverride = {
      component,
      props: props !== null && props !== void 0 ? props : {}
    };
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
  async renderLogin({
    action,
    errorMessage
  }) {
    if (this.loginOverride) {
      const {
        component,
        props = {}
      } = this.loginOverride;
      const mergedProps = _objectSpread({
        action,
        message: errorMessage
      }, props);
      return (0, _utils.getComponentHtml)(component, mergedProps, this);
    }
    return (0, _loginTemplate.default)(this, {
      action,
      errorMessage
    });
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
  findResource(resourceId) {
    const resource = this.resources.find(m => {
      var _m$_decorated;
      return ((_m$_decorated = m._decorated) === null || _m$_decorated === void 0 ? void 0 : _m$_decorated.id()) === resourceId;
    });
    if (!resource) {
      throw new Error([`There are no resources with given id: "${resourceId}"`, 'This is the list of all registered resources you can use:', this.resources.map(r => {
        var _r$_decorated;
        return ((_r$_decorated = r._decorated) === null || _r$_decorated === void 0 ? void 0 : _r$_decorated.id()) || r.id();
      }).join(', ')].join('\n'));
    }
    return resource;
  }

  /**
   * Resolve babel config file path,
   * and load configuration to this.options.bundler.babelConfig.
   */
  resolveBabelConfigPath() {
    var _this$options, _this$options$bundler, _this$options2, _this$options2$bundle;
    if (typeof ((_this$options = this.options) === null || _this$options === void 0 ? void 0 : (_this$options$bundler = _this$options.bundler) === null || _this$options$bundler === void 0 ? void 0 : _this$options$bundler.babelConfig) !== 'string') {
      return;
    }
    let filePath = '';
    let config = (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : (_this$options2$bundle = _this$options2.bundler) === null || _this$options2$bundle === void 0 ? void 0 : _this$options2$bundle.babelConfig;
    if (config[0] === '/') {
      filePath = config;
    } else {
      filePath = (0, _fileResolver.relativeFilePathResolver)(config, /new AdminJS/);
    }
    if (!fs.existsSync(filePath)) {
      throw new _configurationError.default(`Given babel config "${filePath}", doesn't exist.`, 'AdminJS.html');
    }
    if (path.extname(filePath) === '.js') {
      // eslint-disable-next-line
      const configModule = require(filePath);
      config = configModule && configModule.__esModule ? configModule.default || undefined : configModule;
      if (!config || typeof config !== 'object' || Array.isArray(config)) {
        throw new Error(`${filePath}: Configuration should be an exported JavaScript object.`);
      }
    } else {
      try {
        config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (err) {
        throw new Error(`${filePath}: Error while parsing config - ${err.message}`);
      }
      if (!config) throw new Error(`${filePath}: No config detected`);
      if (typeof config !== 'object') {
        throw new Error(`${filePath}: Config returned typeof ${typeof config}`);
      }
      if (Array.isArray(config)) {
        throw new Error(`${filePath}: Expected config object but found array`);
      }
    }
    this.options.bundler.babelConfig = config;
  }

  /**
   * Requires given `.jsx/.tsx` file, that it can be bundled to the frontend.
   * It will be available under AdminJS.UserComponents[componentId].
   *
   * @param   {String}  src  Path to a file containing react component.
   *
   * @param  {OverridableComponent}  [componentName] - name of the component which you want
   *                                  to override
   * @returns {String}                componentId - uniq id of a component
   *
   * @example <caption>Passing custom components in AdminJS options</caption>
   * const adminJsOptions = {
   *   dashboard: {
   *     component: AdminJS.bundle('./path/to/component'),
   *   }
   * }
   * @example <caption>Overriding AdminJS core components</caption>
   * // somewhere in the code
   * AdminJS.bundle('./path/to/new-sidebar/component', 'SidebarFooter')
   */
  static bundle(src, componentName) {
    const nextId = Object.keys(global.UserComponents || {}).length + 1;
    const extensions = ['.jsx', '.js', '.ts', '.tsx'];
    let filePath = '';
    const componentId = componentName || `Component${nextId}`;
    if (path.isAbsolute(src)) {
      filePath = src;
    } else {
      filePath = (0, _fileResolver.relativeFilePathResolver)(src, /.*\.{1}bundle/);
    }
    const {
      ext: originalFileExtension
    } = path.parse(filePath);
    for (const extension of extensions) {
      const forcedExt = extensions.includes(originalFileExtension) ? '' : extension;
      const {
        root,
        dir,
        name,
        ext
      } = path.parse(filePath + forcedExt);
      const fileName = path.format({
        root,
        dir,
        name,
        ext
      });
      if (fs.existsSync(fileName)) {
        // We have to put this to the global scope because of the NPM resolution. If we put this to
        // let say `AdminJS.UserComponents` (static member) it wont work in a case where user uses
        // AdminJS.bundle from a different packages (i.e. from the extension) because there, there
        // is an another AdminJS version (npm installs different versions for each package). Also
        // putting admin to peerDependencies wont solve this issue, because in the development mode
        // we have to install adminjs it as a devDependency, because we want to run test or have
        // proper types.
        global.UserComponents = global.UserComponents || {};
        global.UserComponents[componentId] = path.format({
          root,
          dir,
          name
        });
        return componentId;
      }
    }
    throw new _configurationError.default(`Given file "${src}", doesn't exist.`, 'AdminJS.html');
  }
}
AdminJS.VERSION = VERSION;
AdminJS.ACTIONS = _actions.ACTIONS;

// eslint-disable-next-line @typescript-eslint/no-empty-interface

const {
  registerAdapter
} = AdminJS;
exports.registerAdapter = registerAdapter;
const {
  bundle
} = AdminJS;
exports.bundle = bundle;
var _default = AdminJS;
exports.default = _default;