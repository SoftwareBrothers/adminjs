/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineStyles } from '@adminjs/design-system'
import merge from 'lodash/merge.js'

import ViewHelpers from '../backend/utils/view-helpers/view-helpers.js'
import { initializeStore } from './store/index.js'
import AdminJS from '../adminjs.js'
import { CurrentAdmin } from '../current-admin.interface.js'
import { getFaviconFromBranding } from '../backend/utils/options-parser/options-parser.js'

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
const html = async (admin: AdminJS, currentAdmin?: CurrentAdmin, location = '/'): Promise<string> => {
  const h = new ViewHelpers({ options: admin.options })

  const store = await initializeStore(admin, currentAdmin)
  const reduxState = store.getState()

  const { branding, assets, locale, theme: selectedTheme } = reduxState

  const scripts = ((assets?.scripts) || []).map((s) => `<script src="${s}"></script>`)
  const styles = ((assets?.styles) || []).map((l) => `<link rel="stylesheet" type="text/css" href="${l}">`)
  const theme = combineStyles(branding.theme, selectedTheme?.overrides)
  const faviconTag = getFaviconFromBranding(branding)

  return `
    <!DOCTYPE html>
    <html lang=${locale.language}>
    <head>
      <script>
        window.REDUX_STATE = ${JSON.stringify(reduxState)};
        window.THEME = ${JSON.stringify(theme)};
        window.THEME_COMPONENTS = {};
        window.AdminJS = { Components: {} };
      </script>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${branding.companyName}</title>
      ${faviconTag}

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">

      <script src="${h.assetPath('global.bundle.js', assets)}"></script>
      <script src="${h.assetPath('design-system.bundle.js', assets)}"></script>
      <script src="${h.assetPath('app.bundle.js', assets)}"></script>
      <script src="${h.assetPath('components.bundle.js', assets)}"></script>
      <style>
      /* http://meyerweb.com/eric/tools/css/reset/
      v4.0 | 20180602
      License: none (public domain)
      */
      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed,
      figure, figcaption, footer, header, hgroup,
      main, menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article, aside, details, figcaption, figure,
      footer, header, hgroup, main, menu, nav, section {
        display: block;
      }
      /* HTML5 hidden-attribute fix for newer browsers */
      *[hidden] {
          display: none;
      }
      body {
        line-height: 1;
      }
      ol, ul {
        list-style: none;
      }
      blockquote, q {
        quotes: none;
      }
      blockquote:before, blockquote:after,
      q:before, q:after {
        content: '';
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      html, body, #app {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        color: '#0C1E29';
      }
      #app {
        isolation: isolate;
      }
      :root {
        color-scheme: light;
      }
      </style>
      ${selectedTheme ? `<script src="${h.assetPath(`themes/${selectedTheme.id}/theme.bundle.js`, assets)}"></script>` : ''}
      ${styles.join('\n')}
      ${selectedTheme ? `<link rel="stylesheet" type="text/css" href="${h.assetPath(`themes/${selectedTheme.id}/style.css`, assets)}">` : ''}
    </head>
    <body>
      <div id="app" />
      <script>
        var app = document.getElementById('app');
        var root = createRoot(app)
        root.render(AdminJS.Application);
      </script>
      ${scripts.join('\n')}
    </body>
    </html>
  `
}
export default html
