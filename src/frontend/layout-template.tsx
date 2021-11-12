/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineStyles } from '@adminjs/design-system'

import ViewHelpers from '../backend/utils/view-helpers/view-helpers'
import { initializeStore } from './store'
import AdminJS from '../adminjs'
import { CurrentAdmin } from '../current-admin.interface'
import { getFaviconFromBranding } from '../backend/utils/options-parser/options-parser'

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
const html = async (
  admin: AdminJS,
  currentAdmin?: CurrentAdmin,
  location = '/',
): Promise<string> => {
  const h = new ViewHelpers({ options: admin.options })

  const store = await initializeStore(admin, currentAdmin)
  const reduxState = store.getState()

  const { branding, assets } = reduxState

  const scripts = ((assets && assets.scripts) || [])
    .map(s => `<script src="${s}"></script>`)
  const styles = ((assets && assets.styles) || [])
    .map(l => `<link rel="stylesheet" type="text/css" href="${l}">`)
  const theme = combineStyles((branding.theme) || {})
  const faviconTag = getFaviconFromBranding(branding)

  return `
    <!DOCTYPE html>
    <html>
    <head>
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

      <script src="${h.assetPath('global.bundle.js')}"></script>
      <script src="${h.assetPath('design-system.bundle.js')}"></script>
      <script src="${h.assetPath('app.bundle.js')}"></script>
      <script src="${h.assetPath('components.bundle.js')}"></script>
      ${styles.join('\n')}
    </head>
    <body>
      <div id="app" />
      <script>
        var app = document.getElementById( 'app' );
        ReactDOM.render( AdminJS.Application, app );
      </script>
      ${scripts.join('\n')}
    </body>
    </html>
  `
}
export default html
