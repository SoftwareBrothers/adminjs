import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { I18nextProvider, I18nextProviderProps } from 'react-i18next'
import { combineStyles } from '@adminjs/design-system'
import i18n from 'i18next'
import { Store } from 'redux'

import { getAssets, getBranding, getFaviconFromBranding } from '../../../backend/utils/options-parser/options-parser.js'
import ViewHelpers from '../../../backend/utils/view-helpers/view-helpers.js'
import { initializeAssets } from '../../../frontend/store/actions/initialize-assets.js'
import { initializeBranding } from '../../../frontend/store/actions/initialize-branding.js'
import { initializeLocale } from '../../../frontend/store/actions/initialize-locale.js'
import createStore, {
  ReduxState,
} from '../../../frontend/store/store.js'
import AdminJS from '../../../adminjs.js'
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from '../../../frontend/utils/styled-components.js'

export async function getComponentHtml<T extends Record<string, unknown>>(
  Component: React.FC<T>,
  props: T,
  admin: AdminJS,
): Promise<string> {
  const h = new ViewHelpers({ options: admin.options })

  const store: Store<ReduxState> = createStore()

  const branding = await getBranding(admin)
  const assets = await getAssets(admin)
  const faviconTag = getFaviconFromBranding(branding)

  const scripts = ((assets && assets.scripts) || [])
    .map((s) => `<script src="${s}"></script>`)
  const styles = ((assets && assets.styles) || [])
    .map((l) => `<link rel="stylesheet" type="text/css" href="${l}">`)

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

  const component = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n as unknown as I18nextProviderProps['i18n']}>
          <ThemeProvider theme={theme}>
            <Component {...props} />
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </StyleSheetManager>,
  )

  sheet.collectStyles(<Component {...props} />)
  const style = sheet.getStyleTags()
  sheet.seal()

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${branding.companyName}</title>
      ${style}
      ${faviconTag}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
      ${styles.join('\n')}

      <script src="${h.assetPath('global.bundle.js', assets)}"></script>
      <script src="${h.assetPath('design-system.bundle.js', assets)}"></script>
    </head>
    <body>
      <div id="app">${component}</div>
      ${scripts.join('\n')}
    </body>
    </html>
  `
}

export default getComponentHtml
