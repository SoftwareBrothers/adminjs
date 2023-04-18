import React, { ReactNode } from 'react'
import { StaticRouter } from 'react-router-dom/server.js'
import { combineStyles } from '@adminjs/design-system'
// @ts-ignore Note: Ignore while @adminjs/design-system/styled-components doesn't export types
import { ThemeProvider } from '@adminjs/design-system/styled-components'
import { I18nextProvider } from 'react-i18next'

import { defaultLocale } from '../../../locale/index.js'
import initTranslations from '../../utils/adminjs.i18n.js'

const theme = combineStyles({})

type Props = {
  children: ReactNode;
  location?: string;
}

const TestContextProvider: React.FC<Props> = (props) => {
  const { children, location } = props
  const { i18n } = initTranslations(defaultLocale)

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <StaticRouter location={location || '/'}>
          {children}
        </StaticRouter>
      </I18nextProvider>
    </ThemeProvider>
  )
}

export default TestContextProvider
