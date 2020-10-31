import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ThemeProvider, StyleSheetManager } from 'styled-components'

import * as theme from '../../admin-bro-design-system/src/theme'
import { Box, PortalUtils } from '../../admin-bro-design-system/src'

const store = createStore(() => ({}), {})

const Component = (props) => {
  const { frameContext } = props

  PortalUtils.appendElement = (element) => {
    frameContext.document.body.appendChild(element)
  },

  PortalUtils.removeElement = (id: string): void => {
    const domElement = frameContext.document.getElementById(id)
    domElement?.remove()
  }

  return (
    <Provider store={store}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" type="text/css" />
      <BrowserRouter>
        <StyleSheetManager target={frameContext.document.head}>
          <ThemeProvider theme={theme}>
            <Box border="default" p='xxl'>
              {props.children}
            </Box>
          </ThemeProvider>
        </StyleSheetManager>
      </BrowserRouter>
    </Provider>
  )
}

export default Component
