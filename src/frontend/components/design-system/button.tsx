import styled, { keyframes, DefaultTheme } from 'styled-components'
import { lighten } from 'polished'
import { color, space, fontSize, ColorProps, SpaceProps, FontSizeProps, variant } from 'styled-system'

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
    },
    danger: {
      color: 'white',
      bg: 'danger',
      'border-color': 'transparent',
      '&:hover': {
        'box-shadow': `0 0 0 2px ${lighten(0.1, theme.colors.danger)};`,
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

const Button = styled.button<ColorProps | SpaceProps | FontSizeProps>`
  outline: 0;
  line-height: ${({ theme }): string => theme.lineHeights.standard};
  border: 1px solid ${({ theme }): string => theme.colors.primary};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 2px ${({ theme }): string => lighten(0.1, theme.colors.primary)};
    animation: ${pulse} .3s;
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
