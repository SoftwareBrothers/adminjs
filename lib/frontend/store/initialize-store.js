"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeStore = exports.default = void 0;

var _store = _interopRequireDefault(require("./store"));

var _actions = require("./actions");

var _pagesToStore = _interopRequireDefault(require("./pages-to-store"));

var _optionsParser = require("../../backend/utils/options-parser/options-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initializeStore = async (admin, currentAdmin) => {
  const store = (0, _store.default)();
  const AdminClass = admin.constructor;
  const adminVersion = AdminClass.VERSION;
  store.dispatch((0, _actions.initializeLocale)(admin.locale));
  store.dispatch((0, _actions.initializeResources)(admin.resources.map(resource => {
    try {
      return resource.decorate().toJSON(currentAdmin);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error', resource._decorated);
      throw e;
    }
  })));
  const branding = await (0, _optionsParser.getBranding)(admin, currentAdmin);
  const assets = await (0, _optionsParser.getAssets)(admin, currentAdmin);
  store.dispatch((0, _actions.initializeBranding)(branding || {}));
  store.dispatch((0, _actions.initializeAssets)(assets || {}));
  const {
    loginPath,
    logoutPath,
    rootPath,
    dashboard,
    pages,
    assetsCDN
  } = admin.options;
  const pagesArray = (0, _pagesToStore.default)(pages);
  store.dispatch((0, _actions.initializePages)(pagesArray));
  store.dispatch((0, _actions.initializePaths)({
    loginPath,
    logoutPath,
    rootPath,
    assetsCDN
  }));
  store.dispatch((0, _actions.setCurrentAdmin)(currentAdmin));
  store.dispatch((0, _actions.initializeDashboard)(dashboard));
  store.dispatch((0, _actions.initializeVersions)({
    app: admin.options.version && admin.options.version.app,
    admin: admin.options.version && admin.options.version.admin ? adminVersion : undefined
  }));
  return store;
};

exports.initializeStore = initializeStore;
var _default = initializeStore;
exports.default = _default;