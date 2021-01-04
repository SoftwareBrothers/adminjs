/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineStyles } from '@admin-bro/design-system'
import i18n from 'i18next'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components'
import AdminBro from '../admin-bro'
import { getAssets, getBranding, getFaviconFromBranding } from '../backend/utils/options-parser/options-parser'
import ViewHelpers from '../backend/utils/view-helpers/view-helpers'
import LoginComponent from './components/login'
import { initializeAssets } from './store/actions/initialize-assets'
import { initializeBranding } from './store/actions/initialize-branding'
import { initializeLocale } from './store/actions/initialize-locale'
import createStore, {
  ReduxState,
} from './store/store'

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

  const scripts = ((assets && assets.scripts) || [])
    .map(s => `<script src="${s}"></script>`)
  const styles = ((assets && assets.styles) || [])
    .map(l => `<link rel="stylesheet" type="text/css" href="${l}">`)

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
      ${styles.join('\n')}

      <script src="${h.assetPath('global.bundle.js')}"></script>
      <script src="${h.assetPath('design-system.bundle.js')}"></script>
    </head>
    <body>
      <div id="app">${loginComponent}</div>
      ${scripts.join('\n')}
    </body>
    </html>
  `
}

export default html
