import React from 'react'
import { addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { Flex } from '../atoms/flex'

import * as theme from '../theme'

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <Flex width={1} height={1}>
      {storyFn()}
    </Flex>
  </ThemeProvider>
))