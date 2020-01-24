import styled from 'styled-components'
import { color, fontSize, ColorProps, FontSizeProps, variant } from 'styled-system'

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

export type LinkProps = ColorProps & FontSizeProps & {
  uppercase: boolean;
}

export const Link = styled.a<LinkProps>`
  font-family: ${({ theme }): string => theme.font};
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  ${({ uppercase }): string => (uppercase ? 'text-transform: uppercase;' : '')}
  ${color};
  ${fontSize};
  ${sizeVariants};
`

Link.defaultProps = {
  color: 'textDefault',
}
