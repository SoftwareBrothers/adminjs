/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider, StyleSheetManager } from 'styled-components'
import { Store } from 'redux'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

import { Provider } from 'react-redux'
import { combineStyles } from '@admin-bro/design-system'
import LoginComponent from './components/login'
import AdminBro from '../admin-bro'

import createStore, {
  initializeBranding,
  initializeLocale,
  ReduxState,
  initializeAssets,
} from './store/store'
import ViewHelpers from '../backend/utils/view-helpers'
import { getBranding, getAssets, getFaviconFromBranding } from '../backend/utils/options-parser'

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

const html = async (
  admin: AdminBro,
  { action, errorMessage }: LoginTemplateAttributes,
): Promise<string> => {
  const h = new ViewHelpers({ options: admin.options })

  const store: Store<ReduxState> = createStore()

  const branding = await getBranding(admin)
  const assets = await getAssets(admin)
  const faviconTag = getFaviconFromBranding(branding)

  store.dispatch(initializeBranding(branding))
  store.dispatch(initializeAssets(assets))
  store.dispatch(initializeLocale(admin.locale))

  const theme = combineStyles((branding && branding.theme) || {})
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

  const sheet = new ServerStyleSheet()

  const loginComponent = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <LoginComponent action={action} message={errorMessage} />
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </StyleSheetManager>,
  )

  sheet.collectStyles(<LoginComponent action={action} message={errorMessage} />)
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
      ${faviconTag}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">

      <script src="${h.assetPath('global.bundle.js')}"></script>
      <script src="${h.assetPath('design-system.bundle.js')}"></script>
    </head>
    <body>
      <div id="app">${loginComponent}</div>
    </body>
    </html>
  `
}

export default html
