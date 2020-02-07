/**
 * @interface DesignSystem
 */

/**
 * @memberof DesignSystem
 */
const colors = {
  bluePrimary: '#4268F6',
  blue80: '#6483F8',
  blueLight: '#879FFA',
  blue40: '#A9BAFA',
  bluePale: '#CBD5FD',
  blueHover: '#535B8E',
  blueSecondary: '#38CAF1',
  blueFilter: '#343F87',

  // Blacks
  black: '#1C1C38',
  darkGrey: '#454655',
  grey: '#898A9A',
  greyLight: '#C0C0CA',
  greyPale: '#F6F7FB',
  white: '#fff',

  // Additional
  red: '#FF4567',
  paleRed: '#FFA5B5',
  treal: '#70C9B0',
  paleTreal: '#DBF0F1',
  love: '#e6282b',
}

/**
 * @memberof DesignSystem
 */
const space = {
  xs: '2px',
  sm: '4px',
  default: '8px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  x3: '48px',
  x4: '64px',
  x5: '80px',
  x6: '128px',
}

/**
 * @memberof DesignSystem
 */
const sizes = {
  navbarHeight: '64px',
  sidebarWidth: '300px',
}

/**
 * @memberof DesignSystem
 */
const fontSizes = {
  xs: '10px',
  sm: '12px',
  default: '14px',
  lg: '16px',
  xl: '18px',
  h4: '24px',
  h3: '28px',
  h2: '32px',
  h1: '40px',
}

/**
 * @memberof DesignSystem
 */
const fontWeights = {
  lighter: 300,
  normal: 400,
  bold: 700,
}

/**
 * @memberof DesignSystem
 */
const lineHeights = {
  sm: '12px',
  default: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '40px',
}

const font = '\'Roboto\', sans-serif'

export { colors, lineHeights, fontWeights, fontSizes, sizes, space, font }

/**
 * The color utility parses a component's color and bg props and converts them into CSS
 * declarations. By default the raw value of the prop is returned. But most often you
 * would use one of the color from the [color palette]{@link DesignSystem.colors}.
 *
 * Components using __ColorProps__:
 * - {@link Text}
 *
 * @typedef {object} ColorProps
 * @alias ColorProps
 * @memberof DesignSystem
 * @property {string} [color]                 Text color. It could be either a #hash or
 *                                            {@link DesignSystem.colors} from css theme name like
 *                                            `darkGrey`
 * @property {string} [backgroundColor, bg]   Background color. Similar as above could be a
 *                                            #hash or color name.
 */

/**
 * The space utility converts shorthand margin and padding props to margin and padding
 * CSS declarations.
 *
 * You can use as a value raw dimensions in "px" or one of the value from the
 * [space scale]{@link DesignSystem.space}.
 *
 * Components using __SpaceProps__:
 * - {@link Text}
 *
 * @typedef {object} SpaceProps
 * @alias SpaceProps
 * @memberof DesignSystem
 * @property {string} [margin, m]             margin
 * @property {string} [marginTop, mt]         margin-top
 * @property {string} [marginRight, mr]       margin-right
 * @property {string} [marginBottom, mb]      margin-bottom
 * @property {string} [marginLeft, ml]        margin-left
 * @property {string} [marginX, mx]           margin-left and margin-right
 * @property {string} [marginY, my]           margin-top and margin-bottom
 * @property {string} [padding, p]            padding
 * @property {string} [paddingTop, pt]        padding-top
 * @property {string} [paddingRight, pr]      padding-right
 * @property {string} [paddingBottom, pb]     padding-bottom
 * @property {string} [paddingLeft, pl]       padding-left
 * @property {string} [paddingX, px]          padding-left and padding-right
 * @property {string} [paddingY, py]          padding-top and padding-bottom
 *
 * Set of props related to {@link DesignSystem.space}. You can put there either string with 'px' or
 * one of `space` properties like `sm`, `default`, `xl` etc.
 */

/**
 * Typography props include _fontFamily_, _fontSize_, _fontWeight_, _lineHeight_, _letterSpacing_,
 * _textAlign_, and _fontStyle_.
 *
 * Components using __TypographyProps__:
 * - {@link Text}

 * @typedef {object} TypographyProps
 * @alias TypographyProps
 * @memberof DesignSystem
 * @property {string} [fontSize]    font-size. Could be either actual css value or key taken from
 *                                  {@link DesignSystem.fontSizes}
 * @property {string} [fontWeight]  font-weight. Could be either actual css value or key taken from
 *                                  {@link DesignSystem.fontWeights}
 * @property {string} [lineHeight]  line-height. Could be either actual css value or key taken from
 *                                  {@link DesignSystem.lineHeights}
 * @property {string} [textAlign]   text-align
 * @property {string} [fontFamily]  font-family
 * @property {string} [fontStyle]   font-style
 * @property {string} [letterSpacing]  letter-spacing
 */

/**
 * The layout utility includes style props for width, height, display, minWidth,
 * minHeight, maxWidth, maxHeight, size, verticalAlign, overflow, overflowX, and overflowY.
 *
 * The width prop is transformed based on the following:
 *
 * - Numbers from 0-1 are converted to percentage widths.
 * - Numbers greater than 1 are converted to pixel values.
 * - String values are passed as raw CSS values.
 * - And arrays are converted to responsive width styles.
 * - the width prop will attempt to pick up values from the {@link DesignSystem.sizes}
 *
 * Components using __LayoutProps__:
 * - {@link TextArea}
 *
 * @example
 * // width `50%`
 * <Box width={1/2} />
 *
 * // width `256px`
 * <Box width={256} />
 *
 * // width `'2em'`
 * <Box width='2em' />
 *
 * // width `100%` on all viewport and `50%` from the smallest breakpoint and up
 * <Box width={[ 1, 1/2 ]} />
 *
 * // width from `theme.sizes`
 * <Box height='navbarHeight' />
 *
 * @typedef {object} LayoutProps
 * @alias LayoutProps
 * @memberof DesignSystem
 * @property {string} [width]         width
 * @property {string} [height]        height
 * @property {string} [display]       display
 * @property {string} [minWidth]      min-width
 * @property {string} [minHeight]     min-height
 * @property {string} [maxWidth]      max-width
 * @property {string} [maxHeight]     max-height
 * @property {string} [size]          size
 * @property {string} [verticalAlign] vertical-align
 * @property {string} [overflow]      overflow
 * @property {string} [overflowX]     overflow-x
 * @property {string} [overflowY]     overflow-y
 */


/**
 * The flexbox utility includes style props for alignItems, alignContent, justifyItems,
 * justifyContent, flexWrap, flexDirection, flex, flexGrow, flexShrink, flexBasis,
 * justifySelf, alignSelf, and order.
 *
 * The width prop is transformed based on the following:
 *
 * - Numbers from 0-1 are converted to percentage widths.
 * - Numbers greater than 1 are converted to pixel values.
 * - String values are passed as raw CSS values.
 * - And arrays are converted to responsive width styles.
 * - the width prop will attempt to pick up values from the {@link DesignSystem.sizes}
 *
 * Components using __LayoutProps__:
 * - {@link TextArea}
 *
 * @example
 * // alignItems
 * <Box alignItems='center' />
 *
 * // alignContent
 * <Box alignContent='center' />
 *
 * // justifyContent
 * <Box justifyContent='center' />
 *
 * // flexWrap
 * <Box flexWrap='wrap' />
 *
 * // flexBasis
 * <Box flexBasis='auto' />
 *
 * // flexDirection
 * <Box flexDirection='column' />
 *
 * // flex
 * <Box flex />
 *
 * // justifySelf
 * <Box justifySelf='center' />
 *
 * // alignSelf
 * <Box alignSelf='center' />
 *
 * // order
 * <Box order='2' />
 *
 * @typedef {object} FlexboxProps
 * @alias FlexboxProps
 * @memberof DesignSystem
 * @property {string} [alignItems]         align-items
 * @property {string} [alignContent]       align-content
 * @property {string} [justifyItems]       justify-items
 * @property {string} [justifyContent]     justify-content
 * @property {string} [flexWrap]           flex-wrap
 * @property {string} [flexDirection]      flex-direction
 * @property {boolean} [flex]               flex
 * @property {number|string} [flexGrow]           flex-grow
 * @property {number} [flexShrink]         flex-shrink
 * @property {string} [flexBasis]          flex-basis
 * @property {string} [justifySelf]        justify-self
 * @property {string} [alignSelf]          align-self
 * @property {number|string} [order]              order
 */


/**
 * The border utility includes all style props related to border
 *
 * Components using __BorderProps__:
 * - {@link Text}

 * @typedef {object} BorderProps
 * @alias BorderProps
 * @memberof DesignSystem
 * @property {string | number} [borderWidth]
 * @property {string} [borderStyle]
 * @property {string} [borderColor] It could be either a #hash or {@link DesignSystem.colors}
 * @property {string | number} [borderRadius]
 * @property {string | number} [borderTop]
 * @property {string | number} [borderTopWidth]
 * @property {string} [borderTopStyle]
 * @property {string} [borderTopColor] It could be either a #hash or {@link DesignSystem.colors}
 * @property {string | number} [borderTopLeftRadius]
 * @property {string | number} [borderTopRightRadius]
 * @property {string | number} [borderRight]
 * @property {string | number} [borderRightWidth]
 * @property {string} [borderRightStyle]
 * @property {string} [borderRightColor] It could be either a #hash or {@link DesignSystem.colors}
 * @property {string | number} [borderBottom]
 * @property {string | number} [borderBottomWidth]
 * @property {string} [borderBottomStyle]
 * @property {string} [borderBottomColor] It could be either a #hash or {@link DesignSystem.colors}
 * @property {string | number} [borderBottomLeftRadius]
 * @property {string | number} [borderBottomRightRadius]
 * @property {string | number} [borderLeft]
 * @property {string | number} [borderLeftWidth]
 * @property {string} [borderLeftStyle]
 * @property {string} [borderLeftColor] It could be either a #hash or {@link DesignSystem.colors}
 * @property {string | number} [borderX]
 * @property {string | number} [borderY]
 */

/**
 * The position utility includes style props for position, zIndex, top, right, bottom, and left.
 *
 * @typedef {object} PositionProps
 * @alias PositionProps
 * @memberof DesignSystem
 * property {string | number} [position]
 * property {string | number} [zIndex]
 * property {string | number} [top]
 * property {string | number} [right]
 * property {string | number} [bottom]
 * property {string | number} [left]
 */
