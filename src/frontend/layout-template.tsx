import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import App from './components/app/application'
import ViewHelpers from '../backend/utils/view-helpers'
import initializeStore from './store'
import combineStyles from './styles/combine-styles'
import globalDependencies from './utils/global-dependencies'
import AdminBro from '../admin-bro'
import { CurrentAdmin } from '../current-admin.interface'

/**
 * Renders (SSR) html for given location
 *
 * @param {AdminBro} admin
 * @param {Object} [currentAdmin]
 * @param {String} currentAdmin.email
 * @param {String} location='/'
 *
 * @private
 */
const html = (admin: AdminBro, currentAdmin: CurrentAdmin, location = '/'): string => {
  const context = {}
  const h = new ViewHelpers({ options: admin.options })
  const locationInAdmin = h.urlBuilder([location])
  const store = initializeStore(admin, currentAdmin)
  const reduxState = store.getState()
  const scripts = ((admin.options.assets && admin.options.assets.scripts) || [])
    .map(s => `<script src="${s}"></script>`)
  const styles = ((admin.options.assets && admin.options.assets.styles) || [])
    .map(l => `<link rel="stylesheet" type="text/css" href="${l}">`)
  const theme = combineStyles((admin.options.branding && admin.options.branding.theme) || {})

  const jsx = (
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StaticRouter context={context} location={locationInAdmin}>
          <App />
        </StaticRouter>
      </ThemeProvider>
    </Provider>
  )

  const appComponent = renderToString(jsx)

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <script>
        window.REDUX_STATE = ${JSON.stringify(reduxState)};
        window.THEME = ${JSON.stringify(theme)};
        window.AdminBro = { Components: {} };
      </script>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${admin.options.branding.companyName}</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.5.7/flatpickr.min.js"></script>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.5.7/flatpickr.min.css">

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css" type="text/css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-mfizz/2.4.1/font-mfizz.min.css" type="text/css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" type="text/css">
      <link rel="stylesheet" type="text/css" href="${h.assetPath('icomoon.css')}">

      <link rel="stylesheet" type="text/css" href="https://cdn.quilljs.com/1.3.6/quill.snow.css">
      <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
      <script src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      ${globalDependencies({ fromCDN: admin.options.assets.globalsFromCDN, viewHelpers: h })}
      <script src="${h.assetPath('app.bundle.js')}"></script>
      <script src="${h.assetPath('components.bundle.js')}"></script>
      ${styles.join('\n')}
    </head>
    <body>
      <div id="app">${appComponent}</div>
      <script>
        var app = document.getElementById( 'app' );
        ReactDOM.hydrate( AdminBro.Application, app );
      </script>
      ${scripts.join('\n')}
    </body>
    </html>
  `
}
export default html
