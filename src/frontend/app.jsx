import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/index.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import createStore from './store/index'

const store = createStore(window.REDUX_STATE)

const jsx = (
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const app = document.getElementById( 'app' )
ReactDOM.hydrate( jsx, app )
