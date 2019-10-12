/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import LoginComponent from './components/login'

import * as theme from './styles/variables'

const onProd = process.env.NODE_ENV === 'production'

const html = ({ action, errorMessage }: {
  action: string;
  errorMessage?: string;
}): string => {
  const loginComponent = renderToString(
    // eslint-disable-next-line react/jsx-filename-extension
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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css" type="text/css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-mfizz/2.4.1/font-mfizz.min.css" type="text/css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" type="text/css">

      <script src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
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
