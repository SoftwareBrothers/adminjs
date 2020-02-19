import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const SidebarLink = styled(NavLink)`
  color: ${({ theme }): string => theme.colors.grey80};
  padding: ${({ theme }): string => theme.space.sm};
  display: block;
  text-decoration: none;

  &:hover {
    color: ${({ theme }): string => theme.colors.hoverBg};
  }

  &.active span{
    color: ${({ theme }): string => theme.colors.primary100};
  }
`

export default SidebarLink
