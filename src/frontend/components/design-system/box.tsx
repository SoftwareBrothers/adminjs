import styled from 'styled-components'
import { space, SpaceProps, color, ColorProps } from 'styled-system'

const Box = styled.section<SpaceProps & ColorProps>`
  ${space};
  ${color};
`

Box.defaultProps = {
  p: 5,
  bg: 'white',
}

export default Box
