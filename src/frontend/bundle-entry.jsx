import AdminBro from 'admin-bro'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './components/app/index'
import createStore from './store/store'
import widgets from './components/widgets'
import ApiClient from './utils/api-client'

const Components = { ...AdminBro.Components, ...widgets }

const store = createStore(window.REDUX_STATE)

const Application = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

export default { Application, Components, ApiClient }
