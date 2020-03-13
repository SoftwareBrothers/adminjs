import React from 'react'
import styled, { css } from 'styled-components'
import { space, SpaceProps, color, ColorProps } from 'styled-system'
import * as CarbonIcons from '@carbon/icons-react'
import { cssClass } from '../utils/css-class'

/**
 * Prop Types of an Icon component.
 * Apart from props defined below it extends all {@link ColorProps} and {@link SpaceProps}
 *
 * @memberof Icon
 * @alias IconProps
 * @property {string} [...] Other props from {@link ColorProps} and {@link SpaceProps}
 */
export type IconProps = SpaceProps & ColorProps & {
  /**
   * CamelCased name of an icon from https://www.carbondesignsystem.com/guidelines/icons/library/
   */
  icon?: string;
  /**
   * Size variant. Default to 16
   */
  size?: 16 | 20 | 24 | 32;
  /**
   * Icon color
   */
  color?: string;
  /**
   * Icon background
   */
  bg?: string;
  /**
   * If background should be rounded
   */
  rounded?: boolean;

  /**
   * Indicates if given icons should spin
   */
  spin?: boolean;
}

const spinCss = css`
  @keyframes iconSpin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }

  animation-name: iconSpin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
`

const Wrapper = styled.span<IconProps>`
  vertical-align: middle;
  display: inline-block;
  line-height: ${({ theme }): string => theme.lineHeights.sm};
  font-size: ${({ theme }): string => theme.fontSizes.sm};
  
  & > svg {
    ${({ theme, color: colorProp }): string => (colorProp ? `fill: ${theme.colors[colorProp]}` : '')};
    ${({ spin }): any => (spin ? spinCss : '')};
  }
  ${({ rounded }): string => (rounded ? 'border-radius: 9999px;' : '')};
  ${space};
  ${color};
`

/**
 * Component wrapping [@carbon/icons-react](https://www.npmjs.com/package/@carbon/icons-react).
 * List of all icons can be found here: https://www.carbondesignsystem.com/guidelines/icons/library/
 * but keys are not always 1 to 1 in a relation to the `icons-react` library.
 * If you have problem verifying the key of given icon - you can always open the
 * Chrome Terminal (with AdminBro open) and write there:
 *
 * ```
 * Object.keys(CarbonIcons)
 * ```
 *
 * to see list of all possible icon keys.
 *
 *
 *
 * @component
 * @subcategory Atoms
 * @example <caption>Icons inside other elements</caption>
 * return (
 *   <Box variant="grey">
 *     <Label mb="default"><Icon icon="Accessibility" />Icon in Label</Label>
 *     <Button><Icon icon="Accessibility" />Icon in button</Button>
 *   </Box>
 * )
 * @example <caption>Different sizes</caption>
 * const sizes = [16, 20, 24, 32]
 * return (
 *   <Box variant="grey">
 *     {sizes.map(size => (
 *       <Label m="default"><Icon icon="Accessibility" size={size}/>Icon {size}</Label>
 *     ))}
 *   </Box>
 * )
 *
 * @example <caption>Big rounded icon with background</caption>
 * return (
 *   <Box variant="grey">
 *     <Icon icon="Add" color="white" bg="primary100" rounded size={32} p="default"/>
 *   </Box>
 * )
 */
export const Icon: React.FC<IconProps> = (props) => {
  const { icon, size, color: givenColor, ...other } = props
  const iconSize = size || 16
  const CarbonIcon = CarbonIcons[`${icon}${iconSize}`] || CarbonIcons.ErrorOutline16

  if (CarbonIcon) {
    return (
      <Wrapper className={cssClass('Icon')} color={givenColor || 'grey100'} {...other}><CarbonIcon /></Wrapper>
    )
  }
  return null
}

export default Icon
