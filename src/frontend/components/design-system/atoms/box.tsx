import styled from 'styled-components'
import {
  space, SpaceProps, color, ColorProps,
  size, SizeProps, layout, LayoutProps,
  flexbox, FlexboxProps, border, BorderProps,
  position, PositionProps, variant,
} from 'styled-system'

const variants = variant({
  variants: {
    grey: {
      flexGrow: 1,
      bg: 'greyPale',
      p: 'xl',
    },
    white: {
      p: 'xxl',
      bg: 'white',
    },
  },
})

export type BoxProps = SpaceProps & ColorProps & SizeProps & LayoutProps &
  Omit<FlexboxProps, 'flex'> & BorderProps & PositionProps & {
    flex?: boolean;
    variant?: 'grey' | 'white';
  }

export const Box = styled.section<BoxProps>`
  box-sizing: border-box;
  min-width: 0;
  ${({ flex }): string => (flex ? 'display: flex;' : '')}
  font-family: ${({ theme }): string => theme.font};
  line-height: ${({ theme }): string => theme.lineHeights.lg};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  font-weight: normal;

  ${space};
  ${color};
  ${size};
  ${layout};
  ${flexbox};
  ${border};
  ${position};
  ${variants};
`
