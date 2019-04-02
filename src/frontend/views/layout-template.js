import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from '../../frontend/components/app'
import ViewHelpers from '../../backend/utils/view-helpers'
import createStore, {
  initializeResources,
  intializeBranding,
  intializePaths,
  intializeSession,
} from '../store'
import { Provider } from 'react-redux'

const html = (admin, currentAdmin, location = '/') => {
  const context = {}
  const h = new ViewHelpers({ options: admin.options })
  const locationInAdmin = h.urlBuilder([location])

  const store = createStore()
  store.dispatch(initializeResources(
    admin.resources.map(r => r.decorate().toJSON())
  ))
  store.dispatch(intializeBranding(h.branding))
  const { loginPath, logoutPath, rootPath } = admin.options

  store.dispatch(intializePaths({ loginPath, logoutPath, rootPath }))
  store.dispatch(intializeSession(currentAdmin))
  const reduxState = store.getState()

  const scripts = h.headScripts()
  const styles = h.headStyles()

  const jsx = (
    <Provider store={ store }>
      <StaticRouter context={ context } location={ locationInAdmin }>
        <App />
      </StaticRouter>
    </Provider>
  )

  const appComponent = renderToString(jsx)

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <script>window.REDUX_STATE = ${JSON.stringify(reduxState)}</script>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>AdminBro - ${h.branding.companyName}</title>
      <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/6.0.1/react-redux.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.0.0/react-router-dom.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.1/redux.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
      ${styles.join('\n')}
    </head>
    <body>
      <div id="app">${appComponent}</div>
      ${scripts.join('\n')}
    </body>
    </html>
  `
}
module.exports = html
