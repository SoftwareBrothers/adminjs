import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './components/app/application'
import PropertyTypes from './components/property-type'
import createStore from './store/store'
import * as Components from './components/ui'
import ApiClient from './utils/api-client'
import * as style from './styles/variables'
import * as types from './types'

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
}

const store = createStore(window.REDUX_STATE)

const Application = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

window.regeneratorRuntime = regeneratorRuntime
export default { Application, Components, UserComponents: {}, ApiClient, style, PropertyTypes, types, env }
