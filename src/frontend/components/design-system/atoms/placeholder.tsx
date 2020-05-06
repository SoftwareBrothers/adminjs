/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import styled, { DefaultTheme } from 'styled-components'
import { LayoutProps, layout } from 'styled-system'

import { cssClass } from '../utils/css-class'

const linearGradient = (theme: DefaultTheme): string => (
  `linear-gradient(to right, ${theme.colors.grey60} 8%, ${theme.colors.grey40} 18%, ${theme.colors.grey20} 33%)`
)

const StyledPlaceholder = styled.div<LayoutProps>`
  @keyframes placeHolderShimmer{
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
  }

  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: ${({ theme }): string => theme.colors.white};
  background: ${({ theme }): string => linearGradient(theme)};
  background-size: 1000px 104px;
  height: 338px;
  position: relative;
  overflow: hidden;
  ${layout};
`

/**
 * Renders placeholder
 *
 * Usage:
 * ```javascript
 * import { Placeholder, PlaceholderProps } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Atoms
 * @example <caption>Image placeholder</caption>
 * return (
 *   <Box>
 *     <Placeholder width={100} height={200} />
 *   </Box>
 * )
 *
 * @example <caption>Text placeholder</caption>
 * return (
 *   <Box>
 *     <Label>Some name</Label>
 *     <Placeholder width={400} height={14} />
 *   </Box>
 * )
 */
export const Placeholder: React.FC<PlaceholderProps> = ({ as: htmlAs, ref, ...other }) => (
  <StyledPlaceholder as={htmlAs} {...other} className={cssClass('Placeholder')} />
)

export type PlaceholderProps = LayoutProps & React.HTMLProps<HTMLDivElement> & {
  as?: 'div' | 'span';
}

/**
 * Prop Types of a Placeholder component.
 * Apart from standard html props it extends {@link LayoutProps}
 * @typedef {object} PlaceholderProps
 * @memberof Placeholder
 * @alias PlaceholderProps
 * @property {string} [...] All props default to _div_ html component like `style`,
 *                          `id` etc.
 * @property {string} [...] Props from {@link LayoutProps}
 */

export default Placeholder
