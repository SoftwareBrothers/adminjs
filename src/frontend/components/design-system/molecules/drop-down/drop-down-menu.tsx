import styled from 'styled-components'
import { position, PositionProps } from 'styled-system'

export type DropDownMenuProps = PositionProps & {
  isVisible?: boolean;
}

/**
 * @component
 * @private
 */
export const DropDownMenu = styled.div<DropDownMenuProps>`
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
