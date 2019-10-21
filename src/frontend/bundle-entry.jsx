import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import App from './components/app/application'
import PropertyTypes from './components/property-type'
import createStore from './store/store'
import ViewHelpers from '../backend/utils/view-helpers'
import * as Components from './components/ui'
import * as AppComponents from './components/app'
import ApiClient from './utils/api-client'
import * as style from './styles/variables'
import * as types from './types'

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
}

const store = createStore(window.REDUX_STATE)
const theme = window.THEME

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
  Application,
  ViewHelpers,
  UserComponents: {},
  ApiClient,
  style,
  PropertyTypes,
  env,
  ...Components,
  ...AppComponents,
  types,
  // TODO: following is a backward compatible - remove this in version 2.0
  Components: { ...Components, ...AppComponents },
}
