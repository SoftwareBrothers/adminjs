import styled from 'styled-components'
import {
  space, SpaceProps, color, ColorProps, layout,
  LayoutProps, flexbox, FlexboxProps, border, BorderProps,
  position, PositionProps, variant,
  shadow, ShadowProps,
} from 'styled-system'
import { cssClass } from '../utils/css-class'

const variants = variant({
  variants: {
    grey: {
      flexGrow: 1,
      bg: 'bg',
      py: 'xl',
      px: ['0', 'xl'],
      className: cssClass(['Box', 'Box_Grey']),
    },
    white: {
      px: ['default', 'xxl'],
      py: 'xxl',
      bg: 'white',
      className: cssClass(['Box', 'Box_White']),
    },
  },
})

type FlexboxFlexProp = boolean | FlexboxProps['flex']

/**
 * Prop Types of an Button component.
 * Apart from those defined below it extends all {@link SpaceProps}, {@link ColorProps}
 * {@link LayoutProps}, {@link FlexboxProps}, {@link PositionProps}
 * {@link BorderProps} and {@link ShadowProps}.
 *
 * @memberof Box
 * @alias BoxProps
 * @property {string} [...] Other props from {@link SpaceProps}, {@link ColorProps},
 *                          {@link LayoutProps}, {@link FlexboxProps},
 *                          {@link PositionProps} and {@link BorderProps}.
 */
export type BoxProps = SpaceProps & ColorProps & LayoutProps &
  Omit<FlexboxProps, 'flex'> & BorderProps & PositionProps & ShadowProps & {
    /** If box should be rendered as flex. You can pass boolean or FlexboxProps['flex'] */
    flex?: FlexboxFlexProp;
    /** Box variants */
    variant?: 'grey' | 'white';
    animate?: boolean;
  }

/**
 * Main component which allows you to define entire layout of the application
 *
 * @component
 * @subcategory Atoms
 * @example <caption>Simple White/Gray wrapper</caption>
 * return (
 * <Box variant="grey">
 *   <Box variant="white">
 *     <Text>This is the default wrapper in the application</Text>
 *   </Box>
 * </Box>
 * )
 * @example <caption>Positioning buttons</caption>
 * return (
 * <Box variant="grey">
 *   <Box variant="white" flex flexDirection="row">
 *     <Box flexGrow={1}>
 *       <Header.H3>Some header</Header.H3>
 *     </Box>
 *     <Box flexShrink={0}>
 *       <Button>Example Button On The Right</Button>
 *     </Box>
 *   </Box>
 * </Box>
 * )
 */
export const Box = styled.section<BoxProps>`
  box-sizing: border-box;
  min-width: 0;
  ${({ flex }): string => (flex && typeof flex === 'boolean' ? 'display: flex;' : '')}
  font-family: ${({ theme }): string => theme.font};
  line-height: ${({ theme }): string => theme.lineHeights.default};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  font-weight: normal;
  ${({ animate }): string => (animate ? 'transition: all 500ms;' : '')};

  ${space};
  ${color};
  ${layout};
  ${flexbox};
  ${border};
  ${shadow};
  ${position};
  ${variants};
`

Box.defaultProps = {
  className: cssClass('Box'),
}

export default Box
