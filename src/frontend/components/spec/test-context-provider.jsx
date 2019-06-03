import React from 'react'

import { StaticRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import combineStyles from '../../styles/combine-styles'
import { childrenType } from '../../types'

const theme = combineStyles()

const TestContextProvider = (props) => {
  const { children } = props
  return (
    <ThemeProvider theme={theme}>
      <StaticRouter location="/">
        {children}
      </StaticRouter>
    </ThemeProvider>
  )
}

TestContextProvider.propTypes = {
  children: childrenType.isRequired,
}

export default TestContextProvider
