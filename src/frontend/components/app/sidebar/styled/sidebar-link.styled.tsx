import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const SidebarLink = styled(NavLink)`
  color: ${({ theme }): string => theme.colors.lightText};
  padding: ${({ theme }): string => theme.sizes.paddingMin};
  display: block;

  &:hover {
    color: ${({ theme }): string => theme.colors.primary};
  }

  &.active {
    color: ${({ theme }): string => theme.colors.primary};
  }
`

export default SidebarLink
