import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import merge from 'lodash/merge'

import App from './components/application.jsx'
import BasePropertyComponent, { CleanPropertyComponent } from './components/property-type/index.js'
import createStore from './store/store.js'
import ViewHelpers from '../backend/utils/view-helpers/view-helpers.js'
import * as AppComponents from './components/app/index.js'
import * as Hooks from './hooks/index.js'
import ApiClient from './utils/api-client.js'
import withNotice from './hoc/with-notice.js'
import { flat } from '../utils/flat/index.js'
import { locales } from '../locale/index.js'

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
}

const store = createStore(window.REDUX_STATE)
const theme = window.THEME
const defaultLocale = window.REDUX_STATE.locale
const currentLocale = JSON.parse(window.localStorage.getItem('locale')) || defaultLocale.language

i18n.use(initReactI18next).init({
  resources: Object.keys(locales).reduce(
    (memo, locale) => ({
      ...memo,
      [locale]: {
        translation: merge(
          locales[locale].translations,
          locale === defaultLocale.language ? defaultLocale.translations : {},
        ),
      },
    }),
    {},
  ),
  lng: currentLocale,
  interpolation: { escapeValue: false },
})

const Application = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
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
  CleanPropertyComponent,
  env,
  ...AppComponents,
  ...Hooks,
  flat,
}
