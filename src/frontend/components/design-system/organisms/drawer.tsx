import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

export type DrawerProps = SpaceProps & {
  hidden?: boolean;
}

export const Drawer = styled.section<DrawerProps>`
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: -1px 0px 5px ${({ theme }): string => theme.colors.border};
  width: 500px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 500ms;
  background: ${({ theme }): string => theme.colors.bck};
  border-left: 1px solid ${({ theme }): string => theme.colors.border};

  ${({ hidden }): string => (hidden ? 'right: -500px;' : '')};
  ${space};
`

Drawer.defaultProps = {
  p: 5,
}
