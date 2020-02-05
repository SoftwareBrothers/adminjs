import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const SidebarLink = styled(NavLink)`
  color: ${({ theme }): string => theme.colors.darkGrey};
  padding: ${({ theme }): string => theme.space.sm};
  display: block;
  text-decoration: none;

  &:hover {
    color: ${({ theme }): string => theme.colors.blueHover};
  }

  &.active span{
    color: ${({ theme }): string => theme.colors.bluePrimary};
  }
`

export default SidebarLink
