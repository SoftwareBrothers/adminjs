"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _designSystem = require("@adminjs/design-system");

var _viewHelpers = _interopRequireDefault(require("../backend/utils/view-helpers/view-helpers"));

var _store = require("./store");

var _optionsParser = require("../backend/utils/options-parser/options-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Renders (SSR) html for given location
 *
 * @param {AdminJS} admin
 * @param {Object} [currentAdmin]
 * @param {String} currentAdmin.email
 * @param {String} location='/'
 *
 * @private
 */
const html = async (admin, currentAdmin, location = "/") => {
  const h = new _viewHelpers.default({
    options: admin.options
  });
  const store = await (0, _store.initializeStore)(admin, currentAdmin);
  const reduxState = store.getState();
  const {
    branding,
    assets
  } = reduxState;
  const scripts = (assets && assets.scripts || []).map(s => `<script src="${s}"></script>`);
  const headScripts = (assets && assets.headScripts || []).map(s => `<script src="${s}"></script>`);
  const styles = (assets && assets.styles || []).map(l => `<link rel="stylesheet" type="text/css" href="${l}">`);
  const theme = (0, _designSystem.combineStyles)(branding.theme || {});
  const faviconTag = (0, _optionsParser.getFaviconFromBranding)(branding);
  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${headScripts.join("\n")}
      <script>
        window.REDUX_STATE = ${JSON.stringify(reduxState)};
        window.THEME = ${JSON.stringify(theme)};
        window.AdminJS = { Components: {} };
      </script>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${branding.companyName}</title>
      ${faviconTag}

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">

      <script src="${h.assetPath("global.bundle.js")}"></script>
      <script src="${h.assetPath("design-system.bundle.js")}"></script>
      <script src="${h.assetPath("app.bundle.js")}"></script>
      <script src="${h.assetPath("components.bundle.js")}"></script>
      ${styles.join("\n")}
    </head>
    <body>
      <div id="app" />
      <script>
        var app = document.getElementById( 'app' );
        ReactDOM.render( AdminJS.Application, app );
      </script>
      ${scripts.join("\n")}
    </body>
    </html>
  `;
};

var _default = html;
exports.default = _default;