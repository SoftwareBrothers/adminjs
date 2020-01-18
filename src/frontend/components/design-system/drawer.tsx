import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

type Props = SpaceProps & {
  hidden?: boolean;
}

const Drawer = styled.section<SpaceProps>`
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: -1px 0px 5px ${({ theme }): string => theme.colors.border};
  width: 400px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 500ms;
  background: ${({ theme }): string => theme.colors.bck};
  border-left: 1px solid ${({ theme }): string => theme.colors.border};

  ${({ hidden }): string => (hidden ? 'right: -400px;' : '')};
  ${space};
`

Drawer.defaultProps = {
  p: 5,
}

export default Drawer
