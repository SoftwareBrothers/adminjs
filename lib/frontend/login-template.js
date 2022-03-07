"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _designSystem = require("@adminjs/design-system");

var _i18next = _interopRequireDefault(require("i18next"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _reactI18next = require("react-i18next");

var _reactRedux = require("react-redux");

var _styledComponents = require("styled-components");

var _optionsParser = require("../backend/utils/options-parser/options-parser");

var _viewHelpers = _interopRequireDefault(require("../backend/utils/view-helpers/view-helpers"));

var _login = _interopRequireDefault(require("./components/login"));

var _initializeAssets = require("./store/actions/initialize-assets");

var _initializeBranding = require("./store/actions/initialize-branding");

var _initializeLocale = require("./store/actions/initialize-locale");

var _store = _interopRequireDefault(require("./store/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const html = async (admin, {
  action,
  errorMessage
}) => {
  const h = new _viewHelpers.default({
    options: admin.options
  });
  const store = (0, _store.default)();
  const branding = await (0, _optionsParser.getBranding)(admin);
  const assets = await (0, _optionsParser.getAssets)(admin);
  const faviconTag = (0, _optionsParser.getFaviconFromBranding)(branding);
  const scripts = (assets && assets.scripts || []).map(s => `<script src="${s}"></script>`);
  const headScripts = (assets && assets.headScripts || []).map(s => `<script src="${s}"></script>`);
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
  const loginComponent = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_styledComponents.StyleSheetManager, {
    sheet: sheet.instance
  }, /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_reactI18next.I18nextProvider, {
    i18n: _i18next.default
  }, /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement(_login.default, {
    action: action,
    message: errorMessage
  }))))));
  sheet.collectStyles( /*#__PURE__*/_react.default.createElement(_login.default, {
    action: action,
    message: errorMessage
  }));
  const style = sheet.getStyleTags();
  sheet.seal();
  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${headScripts.join("\n")}
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${branding.companyName}</title>
      ${style}
      ${faviconTag}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">
      ${styles.join("\n")}

      <script src="${h.assetPath("global.bundle.js")}"></script>
      <script src="${h.assetPath("design-system.bundle.js")}"></script>
    </head>
    <body>
      <div id="app">${loginComponent}</div>
      ${scripts.join("\n")}
    </body>
    </html>
  `;
};

var _default = html;
exports.default = _default;