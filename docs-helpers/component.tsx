import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ThemeProvider, StyleSheetManager } from 'styled-components'

import * as theme from '../../admin-bro-design-system/src/theme'

const store = createStore(() => ({}), {})

const Component = (props) => {
  const { frameContext } = props
  return (
    <Provider store={store}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" type="text/css" />
      <link rel="stylesheet" type="text/css" href="https://cdn.quilljs.com/1.3.6/quill.snow.css" />
      <script src="https://cdn.quilljs.com/1.3.6/quill.js" />
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
