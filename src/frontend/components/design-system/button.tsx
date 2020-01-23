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
    bg: 'darkGrey',
  },
}

const buttonVariants = variant({
  variants: {
    primary: {
      bg: 'bluePrimary',
      '&:hover': {
        bg: 'blueHover',
      },
      ...variantShared,
    },
    danger: {
      bg: 'red',
      ...variantShared,
    },
    success: {
      bg: 'treal',
      ...variantShared,
    },
    info: {
      bg: 'blueLight',
      ...variantShared,
    },
    secondary: {
      bg: 'blueSecondary',
      ...variantShared,
    },
    text: {
      color: 'bluePrimary',
      bg: 'transparent',
      borderColor: 'transparent',
      '&:hover': {
        'text-decoration': 'underline',
      },
      '& svg': {
        fill: 'bluePrimary',
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
    icon: {
      py: 3,
      px: 3,
      lineHeight: 1,
      height: '34px',
      '& svg': {
        padding: 0,
      },
    },
  },
})

type Props = ColorProps & SpaceProps & TypographyProps & {
  variant?: 'primary' | 'danger' | 'text' | 'success' | 'info' | 'secondary';
  size?: 'sm' | 'lg' | 'icon';
}

const Button = styled.button<Props>`
  outline: 0;
  line-height: ${({ theme }): string => theme.lineHeights[1]};
  border: 1px solid ${({ theme }): string => theme.colors.bluePrimary};
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
    background: ${({ theme }): string => theme.colors.blueHover};
    border-color: ${({ theme }): string => theme.colors.blueHover};
  }

  &:disabled {
    color: ${({ theme }): string => theme.colors.grey};
    border-color: ${({ theme }): string => theme.colors.darkGray};
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
  color: 'bluePrimary',
}

export default Button
