import styled from 'styled-components'
import {
  space, SpaceProps, color, ColorProps,
  size, SizeProps, layout, LayoutProps,
  flexbox, FlexboxProps, border, BorderProps,
  position, PositionProps,
} from 'styled-system'

export type BoxProps = SpaceProps & ColorProps & SizeProps & LayoutProps &
  Omit<FlexboxProps, 'flex'> & BorderProps & PositionProps & {
    flex?: boolean;
  }

export const Box = styled.section<BoxProps>`
  box-sizing: border-box;
  min-width: 0;
  ${({ flex }): string => (flex ? 'display: flex;' : '')}
  font-family: ${({ theme }): string => theme.font};

  ${space};
  ${color};
  ${size};
  ${layout};
  ${flexbox};
  ${border};
  ${position};
`

Box.defaultProps = {
  bg: 'white',
}
