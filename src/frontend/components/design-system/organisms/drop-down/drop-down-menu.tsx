import styled from 'styled-components'
import { position, PositionProps } from 'styled-system'

export type DropDownMenuProps = PositionProps & {
  isVisible?: boolean;
}

/** @component */
const DropDownMenu = styled.div<DropDownMenuProps>`
  background: ${({ theme }): string => theme.colors.white};
  display: inline-block;
  position: absolute;
  z-index: 40;
  right: 0;
  top: 24px;
  box-shadow: 0 3px 6px ${({ theme }): string => theme.colors.greyLight};
  min-width: 200px;
  ${({ isVisible }): string => (isVisible ? '' : 'display: none;')};
  ${position};
`

DropDownMenu.displayName = 'DropDownMenu'

export default DropDownMenu
