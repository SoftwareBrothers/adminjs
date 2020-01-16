import styled from 'styled-components'
import { color, space, fontSize, SpaceProps, FontSizeProps, ColorProps, variant } from 'styled-system'

const colorVariant = variant({
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
    },
  },
})

const Badge = styled.span<SpaceProps | FontSizeProps | ColorProps>`
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.primary};

  ${space};
  ${color};
  ${fontSize};
  ${colorVariant};
`

Badge.defaultProps = {
  px: 3,
  py: 2,
  fontSize: 1,
  bg: 'white',
  color: 'primary',
}

export default Badge
