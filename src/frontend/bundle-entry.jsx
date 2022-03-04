import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import App from './components/application'
import BasePropertyComponent from './components/property-type'
import createStore from './store/store'
import ViewHelpers from '../backend/utils/view-helpers/view-helpers'
import * as AppComponents from './components/app'
import * as Hooks from './hooks'
import ApiClient from './utils/api-client'
import withNotice from './hoc/with-notice'
import { flat } from '../utils/flat'
import BrandingProvider from './utils/branding-provider'

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
}

const store = createStore(window.REDUX_STATE)
const theme = window.THEME
const { locale } = window.REDUX_STATE

i18n
  .use(initReactI18next)
  .init({
    resources: {
      [locale.language]: {
        translation: locale.translations,
      },
    },
    lng: locale.language,
    interpolation: { escapeValue: false },
  })

const Application = (
  <Provider store={store}>
    <BrandingProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BrandingProvider>
  </Provider>
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
  env,
  ...AppComponents,
  ...Hooks,
  flat,
  // TODO: remove this from the next release
  flatten: flat.flatten,
  unflatten: flat.unflatten,
}
