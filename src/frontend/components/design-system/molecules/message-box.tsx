import React from 'react'
import styled from 'styled-components'
import { variant as styledVariant, SpaceProps } from 'styled-system'


import { Box } from '../atoms/box'
import { Icon } from '../atoms/icon'
import { Button } from '../atoms/button'

const sizeVariants = styledVariant({
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

const variants = theme => styledVariant({
  variants: {
    success: {},
    danger: {
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

const StyledMessageBox = styled.div<StyledMessageBoxProps>`
  line-height: ${({ theme }): string => theme.lineHeights.default};
  box-shadow: 0 2px 0 0 ${({ theme }): string => theme.colors.treal};
  background: ${({ theme }): string => theme.colors.paleTreal};
  color: ${({ theme }): string => theme.colors.darkGrey};
  & > ${Button} {
    float: right;
    margin: 8px;
    & svg {
      fill: ${({ theme }): string => theme.colors.darkGrey};
    }
  }
  ${({ theme }) => variants(theme)};
  ${sizeVariants};
`

const StyledCaption = styled(Box)``

StyledCaption.defaultProps = {
  px: 'xl',
  py: 'lg',
}


const StyledChildren = styled(Box)`
  padding: ${({ theme }): string => theme.space.lg} ${({ theme }): string => theme.space.xl};
  background: ${({ theme }): string => theme.colors.white};
  border-style: solid;
  border-width: 0 1px 1px 1px;
  border-color: ${({ theme }): string => theme.colors.paleTreal};
`

type StyledMessageBoxProps = {
  onCloseClick?: () => void;
  message?: string;
  variant?: 'danger' | 'info' | 'success';
  icon?: string;
  size?: string;
  style?: Record<string, string>;
}

export type MessageBoxProps = SpaceProps & StyledMessageBoxProps

export const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const { onCloseClick, message, icon, children, variant, size, ...other } = props

  return (
    <Box {...other}>
      <StyledMessageBox variant={variant} size={size}>
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
    </Box>
  )
}
