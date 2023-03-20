import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@adminjs/design-system/styled-components'

import ViewHelpers from '../backend/utils/view-helpers/view-helpers.js'
import { flat } from '../utils/flat/index.js'
import * as AppComponents from './components/app/index.js'
import App from './components/application.js'
import BasePropertyComponent, { CleanPropertyComponent } from './components/property-type/index.js'
import Login from './components/login/index.js'
import withNotice from './hoc/with-notice.js'
import * as Hooks from './hooks/index.js'
import createStore from './store/store.js'
import ApiClient from './utils/api-client.js'
import initTranslations from './utils/adminjs.i18n.js'

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
}

const store = createStore(window.REDUX_STATE)
const theme = window.THEME
const { locale } = store.getState()
const { i18n } = initTranslations(locale)

const Application = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  </Provider>
)

const loginAppProps = window.__APP_STATE__ ?? {}
const LoginApplication = (
  <Suspense fallback="...is loading">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <Login {...loginAppProps} />
          </BrowserRouter>
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  </Suspense>
)

// eslint-disable-next-line no-undef
window.regeneratorRuntime = regeneratorRuntime

export default {
  withNotice,
  Application,
  LoginApplication,
  ViewHelpers,
  UserComponents: {},
  ApiClient,
  BasePropertyComponent,
  CleanPropertyComponent,
  env,
  ...AppComponents,
  ...Hooks,
  flat,
}
