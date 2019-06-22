import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import App from './components/app/application'
import ViewHelpers from '../backend/utils/view-helpers'
import initializeStore from './store'
import combineStyles from './styles/combine-styles'

const onProd = process.env.NODE_ENV === 'production'

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
const html = (admin, currentAdmin, location = '/') => {
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
      <title>AdminBro - ${admin.options.branding.companyName}</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.5.7/flatpickr.min.js"></script>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.5.7/flatpickr.min.css">

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css" type="text/css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-mfizz/2.4.1/font-mfizz.min.css" type="text/css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" type="text/css">
      <link rel="stylesheet" type="text/css" href="${h.assetPath('icomoon.css')}">

      <link rel="stylesheet" type="text/css" href="https://cdn.quilljs.com/1.3.6/quill.snow.css">
      <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
      <script src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      <script crossorigin src="https://unpkg.com/react@16/umd/react.${onProd ? 'production.min' : 'development'}.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.${onProd ? 'production.min' : 'development'}.js"></script>
      <script crossorigin="anonymous" src="https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/6.0.1/react-redux.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router/5.0.0/react-router.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.0.0/react-router-dom.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.1/redux.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/styled-components/4.2.0/styled-components.min.js"></script>
      <script src="https://unpkg.com/recharts/umd/Recharts.min.js"></script>
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
module.exports = html
