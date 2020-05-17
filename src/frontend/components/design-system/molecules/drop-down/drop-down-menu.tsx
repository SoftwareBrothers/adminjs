import styled from 'styled-components'
import { position, PositionProps } from 'styled-system'

import Box, { BoxProps } from '../../atoms/box'

export type DropDownMenuProps = PositionProps & BoxProps & {
  isVisible?: boolean;
}

/**
 * @component
 * @private
 */
export const DropDownMenu = styled(Box)<DropDownMenuProps>`
  background: ${({ theme }): string => theme.colors.white};
  display: inline-block;
  position: absolute;
  z-index: 40;
  right: 0;
  top: 24px;
  box-shadow: ${({ theme }): string => theme.shadows.card};
  min-width: 200px;
  ${({ isVisible }): string => (isVisible ? '' : 'display: none;')};
  ${position};
`

DropDownMenu.displayName = 'DropDownMenu'

export default DropDownMenu
