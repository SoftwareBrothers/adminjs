import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ThemeProvider, StyleSheetManager } from 'styled-components'

import * as theme from '../src/frontend/styles/variables'

const store = createStore(() => ({}), {})

const Component = (props) => {
  const { frameContext } = props
  return (
    <Provider store={store}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css" type="text/css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-mfizz/2.4.1/font-mfizz.min.css" type="text/css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" type="text/css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css" type="text/css" />
      <link rel="stylesheet" href="icomoon.css" type="text/css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.5.7/flatpickr.min.js" />
      <link rel="stylesheet" type="text/css" href="https://cdn.quilljs.com/1.3.6/quill.snow.css" />
      <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <script src="https://cdn.quilljs.com/1.3.6/quill.js" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.5.7/flatpickr.min.css" />
      <BrowserRouter>
        <StyleSheetManager target={frameContext.document.head}>
          <ThemeProvider theme={theme}>
            {props.children}
          </ThemeProvider>
        </StyleSheetManager>
      </BrowserRouter>
    </Provider>
  )
}

export default Component
