import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'


import { Box, BoxProps } from '../atoms/box'
import { Icon } from '../atoms/icon'
import { H4 } from '../atoms/header'
import { Button } from '../atoms/button'

const variants = theme => variant({
  variants: {
    success: {},
    error: {
      bg: 'paleRed',
      'box-shadow': `0 2px 0 0 ${theme.colors.red};`,
    },
    info: {
      bg: 'bluePale',
      'box-shadow': `0 2px 0 0 ${theme.colors.bluePrimary};`,
    },
  },
})

const StyledErrorBox = styled(Box)<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

/**
 * @memberof ErrorBox
 * @alias ErrorBoxProps
 */
export type ErrorBoxProps = {
  title: string;
  children: React.ReactNode;
  testId?: string;
}

/**
 * @class
 * Prints error message
 *
 * @component
 * @example
 * return (
 * <ErrorMessageBox title={'Some error'}>
 *   <p>Text below the title</p>
 * </ErrorMessageBox>
 * )
 */
export const ErrorBox: React.FC<ErrorBoxProps> = (props) => {
  const { children, title, testId } = props
  return (
    <StyledErrorBox data-testid={testId} variant="white">
      <Box width={1 / 2}>
        <H4 mb="lg">{title}</H4>
        {children}
      </Box>
    </StyledErrorBox>
  )
}
