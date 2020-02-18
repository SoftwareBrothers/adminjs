/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import LoginComponent from './components/login'

import * as theme from './components/design-system/theme'

const onProd = process.env.NODE_ENV === 'production'

type LoginTemplateAttributes = {
  /**
   * action which should be called when user clicks submit button
   */
  action: string;
  /**
   * Error message to present in the form
   */
  errorMessage?: string;
}

const html = ({ action, errorMessage }: LoginTemplateAttributes): string => {
  const loginComponent = renderToString(
    <ThemeProvider theme={theme}>
      <LoginComponent action={action} message={errorMessage} />
    </ThemeProvider>,
  )

  const sheet = new ServerStyleSheet()
  sheet.collectStyles(LoginComponent)
  const style = sheet.getStyleTags()
  sheet.seal()

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>AdminPanel</title>
      ${style}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">

      <script crossorigin src="https://unpkg.com/react@16/umd/react.${onProd ? 'production.min' : 'development'}.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.${onProd ? 'production.min' : 'development'}.js"></script>
    </head>
    <body>
      <div id="app">${loginComponent}</div>
    </body>
    </html>
  `
}

export default html
