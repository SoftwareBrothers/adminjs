import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { resourceType } from '../../../types'

const ResourceLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.defaultText};
  padding: ${({ theme }) => theme.sizes.paddingMin};
  display: block;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`

class SidebarResource extends React.PureComponent {
  render() {
    const { resource } = this.props
    return (
      <li>
        <ResourceLink to={resource.href}>
          {resource.name}
        </ResourceLink>
      </li>
    )
  }
}

SidebarResource.propTypes = {
  resource: resourceType.isRequired,
}

export default withRouter(SidebarResource)
