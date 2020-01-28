import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

export type DrawerProps = SpaceProps & {
  hidden?: boolean;
}

export const Drawer = styled.section<DrawerProps>`
  z-index: 100;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  box-shadow: 0 3px 6px ${({ theme }): string => theme.colors.greyLight};
  width: 500px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 500ms;
  background: ${({ theme }): string => theme.colors.white};

  ${({ hidden }): string => (hidden ? 'right: -500px;' : '')};
  ${space};
`

export const DrawerFooter = styled.div`
  padding: ${({ theme }): string => theme.space[6]};
  text-align: center;
  border-top: 1px solid ${({ theme }): string => theme.colors.bluePale};
  flex-shrink: 0;
  ${space};
`

export const DrawerContent = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding: ${({ theme }): string => theme.space[5]};
  ${space};
`
