import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './components/app/index'
import createStore from './store/store'
import widgets from './components/widgets'
import * as components from './components/layout'
import ApiClient from './utils/api-client'
import * as style from './styles/variables'

const Components = { ...AdminBro.Components, ...widgets, ...components }

const store = createStore(window.REDUX_STATE)

const Application = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

export default { Application, Components, ApiClient, style }
