import styled from 'styled-components'
import {
  space, SpaceProps, color, ColorProps,
  size, SizeProps, layout, LayoutProps,
  flexbox, FlexboxProps,
} from 'styled-system'

const Box = styled.section<SpaceProps | ColorProps | SizeProps | LayoutProps | FlexboxProps>`
  box-sizing: border-box;
  min-width: 0;

  ${space};
  ${color};
  ${size};
  ${layout};
  ${flexbox};
`

Box.defaultProps = {
  p: 5,
  bg: 'white',
}

export default Box
