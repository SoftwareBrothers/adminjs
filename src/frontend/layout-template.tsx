/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import App from './components/application'
import ViewHelpers from '../backend/utils/view-helpers'
import initializeStore from './store'
import combineStyles from './styles/combine-styles'
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
const html = (admin: AdminBro, currentAdmin?: CurrentAdmin, location = '/'): string => {
  const context = {}
  const h = new ViewHelpers({ options: admin.options })
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
        <StaticRouter context={context} location="/">
          <App />
        </StaticRouter>
      </ThemeProvider>
    </Provider>
  )

  // const appComponent = renderToString(jsx)

  let faviconTag = ''
  if (admin.options.branding.favicon) {
    const { favicon } = admin.options.branding
    const type = favicon.match(/.*\.png$/) ? 'image/png' : 'image/x-icon'
    faviconTag = `<link rel="shortcut icon" type="${type}" href="${favicon}" />`
  }

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
      ${faviconTag}

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">

      <link rel="stylesheet" type="text/css" href="https://cdn.quilljs.com/1.3.6/quill.snow.css">
      <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
      <script src="${h.assetPath('global.bundle.js')}"></script>
      <script src="${h.assetPath('app.bundle.js')}"></script>
      <script src="${h.assetPath('components.bundle.js')}"></script>
      ${styles.join('\n')}
    </head>
    <body>
      <div id="app" />
      <script>
        var app = document.getElementById( 'app' );
        ReactDOM.render( AdminBro.Application, app );
      </script>
      ${scripts.join('\n')}
    </body>
    </html>
  `
}
export default html
