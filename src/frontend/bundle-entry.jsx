import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import ViewHelpers from '../backend/utils/view-helpers/view-helpers'
import { flat } from '../utils/flat'
import * as AppComponents from './components/app'
import App from './components/application'
import BasePropertyComponent, { CleanPropertyComponent } from './components/property-type'
import withNotice from './hoc/with-notice'
import * as Hooks from './hooks'
import createStore from './store/store'
import ApiClient from './utils/api-client'
import initTranslations from './utils/adminJS.i18n'

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
}

const store = createStore(window.REDUX_STATE)
const theme = window.THEME
const { locale } = store.getState()
const { i18n } = initTranslations(locale)

const Application = (
  <Suspense fallback="...is loading">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <App />
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
