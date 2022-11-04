"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getComponentHtml = getComponentHtml;
var _react = _interopRequireDefault(require("react"));
var _server = require("react-dom/server");
var _styledComponents = require("styled-components");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _designSystem = require("@adminjs/design-system");
var _i18next = _interopRequireDefault(require("i18next"));
var _optionsParser = require("../../../backend/utils/options-parser/options-parser");
var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers/view-helpers"));
var _initializeAssets = require("../../../frontend/store/actions/initialize-assets");
var _initializeBranding = require("../../../frontend/store/actions/initialize-branding");
var _initializeLocale = require("../../../frontend/store/actions/initialize-locale");
var _store = _interopRequireDefault(require("../../../frontend/store/store"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function getComponentHtml(Component, props, admin) {
  const h = new _viewHelpers.default({
    options: admin.options
  });
  const store = (0, _store.default)();
  const branding = await (0, _optionsParser.getBranding)(admin);
  const assets = await (0, _optionsParser.getAssets)(admin);
  const faviconTag = (0, _optionsParser.getFaviconFromBranding)(branding);
  const scripts = (assets && assets.scripts || []).map(s => `<script src="${s}"></script>`);
  const styles = (assets && assets.styles || []).map(l => `<link rel="stylesheet" type="text/css" href="${l}">`);
  store.dispatch((0, _initializeBranding.initializeBranding)(branding));
  store.dispatch((0, _initializeAssets.initializeAssets)(assets));
  store.dispatch((0, _initializeLocale.initializeLocale)(admin.locale));
  const theme = (0, _designSystem.combineStyles)(branding && branding.theme || {});
  const {
    locale
  } = store.getState();
  _i18next.default.init({
    resources: {
      [locale.language]: {
        translation: locale.translations
      }
    },
    lng: locale.language,
    interpolation: {
      escapeValue: false
    }
  });
  const sheet = new _styledComponents.ServerStyleSheet();
  const component = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_styledComponents.StyleSheetManager, {
    sheet: sheet.instance
  }, /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_reactI18next.I18nextProvider, {
    i18n: _i18next.default
  }, /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement(Component, props))))));
  sheet.collectStyles( /*#__PURE__*/_react.default.createElement(Component, props));
  const style = sheet.getStyleTags();
  sheet.seal();
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${branding.companyName}</title>
      ${style}
      ${faviconTag}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">
      ${styles.join('\n')}

      <script src="${h.assetPath('global.bundle.js', assets)}"></script>
      <script src="${h.assetPath('design-system.bundle.js', assets)}"></script>
    </head>
    <body>
      <div id="app">${component}</div>
      ${scripts.join('\n')}
    </body>
    </html>
  `;
}
var _default = getComponentHtml;
exports.default = _default;