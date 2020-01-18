import styled from 'styled-components'
import { color, fontSize, ColorProps, FontSizeProps, variant } from 'styled-system'

type Props = ColorProps & FontSizeProps & {
  uppercase: boolean;
}

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


const Link = styled.a<Props>`
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

export default Link
