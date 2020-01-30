import styled from 'styled-components'
import { color, space, ColorProps, FontSizeProps, variant, SpaceProps } from 'styled-system'

const sizeVariants = variant({
  prop: 'size',
  variants: {
    sm: {
      fontSize: 'xs',
      py: 'sm',
    },
    lg: {
      fontSize: 'default',
    },
  },
})

const variants = variant({
  variants: {
    primary: {
      color: 'bluePrimary',
      '&:hover': {
        color: 'blueHover',
        '& svg': {
          fill: 'blueHover',
        },
      },
      '& svg': {
        fill: 'bluePrimary',
      },
    },
    danger: {
      color: 'red',
      '&:hover': {
        color: 'red',
      },
      '& svg': {
        fill: 'red',
      },
    },
    success: {
      color: 'treal',
      '&:hover': {
        color: 'treal',
      },
      '& svg': {
        fill: 'treal',
      },
    },
    info: {
      color: 'blueLight',
      '&:hover': {
        color: 'blueHover',
      },
      '& svg': {
        fill: 'blueLight',
      },
    },
    secondary: {
      color: 'blueSecondary',
      '&:hover': {
        color: 'blueHover',
      },
      '& svg': {
        fill: 'blueSecondary',
      },
    },
  },
})

export type LinkProps = ColorProps & FontSizeProps & SpaceProps & {
  uppercase?: boolean;
  variant?: 'primary' | 'danger' | 'success' | 'info' | 'secondary';
}

export const Link = styled.a<LinkProps>`
  font-family: ${({ theme }): string => theme.font};
  vertical-align: middle;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  & svg {
    padding-right: ${({ theme }): string => theme.space.default};
    vertical-align: text-top;
  }
  ${({ uppercase }): string => (uppercase ? 'text-transform: uppercase;' : '')}
  ${color};
  ${space};
  ${sizeVariants};
  ${variants};
`

Link.defaultProps = {
  color: 'grey',
}
