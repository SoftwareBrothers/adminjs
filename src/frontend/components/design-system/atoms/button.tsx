import styled, { css } from 'styled-components'
import { color, space, ColorProps, SpaceProps,
  TypographyProps, typography, variant } from 'styled-system'

const variantShared = {
  color: 'white',
  'border-color': 'transparent',
  '& svg': {
    fill: 'white',
  },
  '&:disabled': {
    bg: 'greyLight',
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
      '&:disabled': {
        'border-color': 'transparent',
      },
      '&:hover': {
        background: 'transparent',
        color: 'blueHover',
        'border-color': 'transparent',
      },
      '& svg': {
        fill: 'bluePrimary',
      },
      '&:hover svg': {
        fill: 'blueHover',
      },
    },
  },
})

const sizeVariants = variant({
  prop: 'size',
  variants: {
    sm: {
      fontSize: 'default',
      py: 'sm',
      px: 'xxl',
      '& svg': {
        paddingRight: 'sm',
      },
    },
    lg: {
      py: 'default',
      lineHeight: 'lg',
    },
    icon: {
      py: 'default',
      px: 'default',
      lineHeight: 'sm',
      minWidth: '34px',
      height: '34px',
      '& svg': {
        padding: 0,
      },
    },
  },
})

export type ButtonProps = ColorProps & SpaceProps & TypographyProps & {
  variant?: 'primary' | 'danger' | 'text' | 'success' | 'info' | 'secondary';
  size?: 'sm' | 'lg' | 'icon';
  rounded?: boolean;
}

export const ButtonCSS = css`
  outline: 0;
  display: inline-block;
  font-family: ${({ theme }): string => theme.font};
  line-height: ${({ theme }): string => theme.lineHeights.default};
  border: 1px solid ${({ theme }): string => theme.colors.bluePrimary};
  color: ${({ theme }): string => theme.colors.bluePrimary};
  cursor: pointer;
  text-decoration: none;
  padding: ${({ theme }): string => theme.space.default} ${({ theme }): string => theme.space.x3};
  box-sizing: border-box;

  & svg {
    vertical-align: middle;
    padding-bottom: 2px;
    width: 16px;
    height: 16px;
    fill: ${({ theme }): string => theme.colors.bluePrimary};
    padding-right: ${({ theme }): string => theme.space.default};
  }
  &:hover {
    color: ${({ theme }): string => theme.colors.white};
    background: ${({ theme }): string => theme.colors.blueHover};
    border-color: ${({ theme }): string => theme.colors.blueHover};
    svg {
      fill: ${({ theme }): string => theme.colors.white};
    }
  }
  &:focus {
    border-color: ${({ theme }): string => theme.colors.blueSecondary};
  }

  &:disabled {
    color: ${({ theme }): string => theme.colors.grey};
    border-color: ${({ theme }): string => theme.colors.darkGrey};
    background: ${({ theme }): string => theme.colors.white};
    cursor: default;
    & svg {
      fill: ${({ theme }): string => theme.colors.grey};
    }
  }

  ${({ rounded }): string => (rounded ? 'border-radius: 9999px' : '')};

  ${color};
  ${space};
  ${typography};
  ${buttonVariants};
  ${sizeVariants};
`

export const Button = styled.button<ButtonProps>`
  ${ButtonCSS}
`

Button.defaultProps = {
  fontSize: 'default',
  bg: 'transparent',
}
