import styled from 'styled-components'
import {
  space, SpaceProps, color, ColorProps,
  size, SizeProps, layout, LayoutProps,
  flexbox, FlexboxProps,
} from 'styled-system'

export type BoxProps = SpaceProps | ColorProps | SizeProps | LayoutProps | FlexboxProps

export const Box = styled.section<BoxProps>`
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
