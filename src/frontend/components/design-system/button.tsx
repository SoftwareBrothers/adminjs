import styled, { keyframes, DefaultTheme } from 'styled-components'
import { lighten } from 'polished'
import { color, space, fontSize, ColorProps, SpaceProps, FontSizeProps, variant } from 'styled-system'

import Icon from './icon'

const pulse = keyframes`
  from {
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
  }
`
const buttonVariants = (theme: DefaultTheme): any => variant({
  variants: {
    primary: {
      color: 'white',
      bg: 'primary',
      'border-color': 'transparent',
      '& svg': {
        fill: 'white',
      },
    },
    danger: {
      color: 'white',
      bg: 'danger',
      'border-color': 'transparent',
      '&:hover': {
        'box-shadow': `0 0 0 2px ${lighten(0.1, theme.colors.danger)};`,
      },
      '& svg': {
        fill: 'white',
      },
    },
    text: {
      color: 'primary',
      bg: 'transparent',
      borderColor: 'transparent',
      '&:hover': {
        'text-decoration': 'underline',
        'box-shadow': 'none',
      },
      '& svg': {
        fill: 'primary',
      },
    },
  },
})

const sizeVariants = variant({
  prop: 'size',
  variants: {
    sm: {
      fontSize: 0,
      py: 2,
    },
    lg: {
      fontSize: 2,
    },
  },
})

type Props = ColorProps & SpaceProps & FontSizeProps & {
  variant?: 'primary' | 'danger' | 'text';
  size?: 'sm' | 'lg';
}

const Button = styled.button<Props>`
  outline: 0;
  line-height: ${({ theme }): string => theme.lineHeights.standard};
  border: 1px solid ${({ theme }): string => theme.colors.primary};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 2px ${({ theme }): string => lighten(0.1, theme.colors.primary)};
    animation: ${pulse} .3s;
  }

  ${Icon}:first-child {
    position: relative;
    top: 1px;
    left: -6px;
  }

  ${color};
  ${space};
  ${fontSize};
  ${({ theme }): any => buttonVariants(theme)};
  ${sizeVariants};
`

Button.defaultProps = {
  px: 4,
  py: 3,
  fontSize: 1,
  color: 'primary',
}

export default Button
