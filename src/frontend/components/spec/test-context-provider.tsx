import React, { ReactNode } from 'react'

import { StaticRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import combineStyles from '../../styles/combine-styles'

const theme = combineStyles({})

type Props = {
  children: ReactNode;
}

const TestContextProvider: React.FC<Props> = (props) => {
  const { children } = props
  return (
    <ThemeProvider theme={theme}>
      <StaticRouter location="/">
        {children}
      </StaticRouter>
    </ThemeProvider>
  )
}

export default TestContextProvider
