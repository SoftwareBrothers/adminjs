import styled from 'styled-components'
import { color, space, ColorProps, SpaceProps,
  TypographyProps, typography, variant } from 'styled-system'

const variantShared = {
  color: 'white',
  'border-color': 'transparent',
  '& svg': {
    fill: 'white',
  },
  '&:disabled': {
    bg: 'disabled',
  },
}

const buttonVariants = variant({
  variants: {
    primary: {
      bg: 'primary',
      '&:hover': {
        bg: 'primaryHover',
      },
      ...variantShared,
    },
    danger: {
      bg: 'danger',
      ...variantShared,
    },
    success: {
      bg: 'success',
      ...variantShared,
    },
    info: {
      bg: 'info',
      ...variantShared,
    },
    secondary: {
      bg: 'secondary',
      ...variantShared,
    },
    text: {
      color: 'primary',
      bg: 'transparent',
      borderColor: 'transparent',
      '&:hover': {
        'text-decoration': 'underline',
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
      fontSize: 3,
      py: 3,
    },
  },
})

type Props = ColorProps & SpaceProps & TypographyProps & {
  variant?: 'primary' | 'danger' | 'text' | 'success' | 'info' | 'secondary';
  size?: 'sm' | 'lg';
}

const Button = styled.button<Props>`
  outline: 0;
  line-height: ${({ theme }): string => theme.lineHeights.default};
  border: 1px solid ${({ theme }): string => theme.colors.primary};
  cursor: pointer;

  & svg {
    vertical-align: middle;
    padding-bottom: 2px;
    padding-right: ${({ theme }): string => theme.space[3]};
    width: 16px;
    height: 16px;
  }
  &:hover {
    color: ${({ theme }): string => theme.colors.white};
    background: ${({ theme }): string => theme.colors.primaryHover};
    border-color: ${({ theme }): string => theme.colors.primaryHover};
  }

  &:disabled {
    color: ${({ theme }): string => theme.colors.grey};
    border-color: ${({ theme }): string => theme.colors.disabled};
    background: ${({ theme }): string => theme.colors.white};
    cursor: default;
    & svg {
      fill: ${({ theme }): string => theme.colors.grey};
    }
  }

  ${color};
  ${space};
  ${typography};
  ${buttonVariants};
  ${sizeVariants};
  
`

Button.defaultProps = {
  px: 7,
  py: 3,
  fontSize: 2,
  lineHeight: 2,
  color: 'primary',
}

export default Button
