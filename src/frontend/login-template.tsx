/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { Store } from 'redux'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

import { Provider } from 'react-redux'
import LoginComponent from './components/login'
import AdminBro from '../admin-bro'

import createStore, {
  initializeBranding,
  initializeLocale,
  ReduxState,
} from './store/store'
import combineStyles from './styles/combine-styles'
import ViewHelpers from '../backend/utils/view-helpers'

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

const html = (admin: AdminBro, { action, errorMessage }: LoginTemplateAttributes): string => {
  const h = new ViewHelpers({ options: admin.options })

  const store: Store<ReduxState> = createStore()
  store.dispatch(initializeLocale(admin.locale))
  store.dispatch(initializeBranding(admin.options.branding))

  const theme = combineStyles((admin.options.branding && admin.options.branding.theme) || {})
  const { locale } = store.getState()
  i18n
    .init({
      resources: {
        [locale.language]: {
          translation: locale.translations,
        },
      },
      lng: locale.language,
      interpolation: { escapeValue: false },
    })

  const loginComponent = renderToString(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <LoginComponent action={action} message={errorMessage} />
        </ThemeProvider>
      </I18nextProvider>
    </Provider>,
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

      <script src="${h.assetPath('global.bundle.js')}"></script>
    </head>
    <body>
      <div id="app">${loginComponent}</div>
    </body>
    </html>
  `
}

export default html
