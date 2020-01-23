import styled from 'styled-components'

import { typography, TypographyProps, space, SpaceProps, variant, color, ColorProps } from 'styled-system'

const variants = variant({
  variants: {
    xs: {
      fontSize: 0,
    },
    sm: {
      fontSize: 1,
    },
    lg: {
      fontSize: 3,
    },
  },
})

type VariantsProps = {
  variant?: 'xs' | 'sm' | 'lg';
}

const Text = styled.div<TypographyProps & SpaceProps & VariantsProps & ColorProps>`
  font-family: ${({ theme }): string => theme.font};

  ${typography};
  ${space};
  ${color};
  ${variants};
`

Text.defaultProps = {
  p: 0,
  mx: 0,
  mt: 3,
  mb: 3,
  lineHeight: 2,
  fontSize: 2,
  fontWeight: 'lighter',
}


export default Text
