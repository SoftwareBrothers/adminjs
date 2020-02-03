import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'


import { Box, BoxProps } from '../atoms/box'
import { Icon } from '../atoms/icon'
import { Button } from '../atoms/button'

const sizeVariants = variant({
  prop: 'size',
  variants: {
    sm: {
      boxShadow: 'none',
      '& > section, & + section': {
        px: 'lg',
        py: 'default',
      },
      [`& > ${Button}`]: {
        margin: '0px',
      },
    },
  },
})

const variants = theme => variant({
  variants: {
    success: {},
    error: {
      bg: 'paleRed',
      'box-shadow': `0 2px 0 0 ${theme.colors.red};`,
      '& + section': {
        borderColor: 'paleRed',
      },
    },
    info: {
      bg: 'bluePale',
      'box-shadow': `0 2px 0 0 ${theme.colors.bluePrimary};`,
      '& + section': {
        borderColor: 'bluePale',
      },
    },
  },
})

const StyledMessageBox = styled(Box)`
  line-height: ${({ theme }): string => theme.lineHeights.default};
  box-shadow: 0 2px 0 0 ${({ theme }): string => theme.colors.treal};
  & > ${Button} {
    float: right;
    margin: 8px;
    & svg {
      fill: ${({ theme }): string => theme.colors.darkGrey};
    }
  }
  ${({ theme }): string => variants(theme)};
  ${sizeVariants};
`

StyledMessageBox.defaultProps = {
  bg: 'paleTreal',
  color: 'darkGrey',
}

const StyledCaption = styled(Box)``

StyledCaption.defaultProps = {
  px: 'xl',
  py: 'lg',
}


const StyledChildren = styled(Box)`
  padding: ${({ theme }): string => theme.space.lg} ${({ theme }): string => theme.space.xl};
  border-style: solid;
  border-width: 0 1px 1px 1px;
  border-color: ${({ theme }): string => theme.colors.paleTreal};
`


export type MessageBoxProps = BoxProps & {
  onCloseClick?: () => void;
  message?: string;
  variant?: 'error' | 'info' | 'success';
  icon?: string;
}

export const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const { onCloseClick, message, icon, children, ...other } = props

  return (
    <React.Fragment>
      <StyledMessageBox {...other}>
        {onCloseClick ? (
          <Button variant="text" size="icon" onClick={onCloseClick}>
            <Icon icon="Close" />
          </Button>
        ) : ''}
        <StyledCaption>
          {icon ? (
            <Icon icon={icon} mr="default" />
          ) : ''}
          {message}
        </StyledCaption>
      </StyledMessageBox>
      {children ? (
        <StyledChildren>
          {children}
        </StyledChildren>
      ) : ''}
    </React.Fragment>
  )
}
