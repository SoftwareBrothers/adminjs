import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { resourceType } from '../../../types'
import { colors, sizes } from '../../../styles/variables'

const ResourceLink = styled(NavLink)`
  color: ${colors.defaultText};
  padding: ${sizes.paddingMin};
  display: block;

  &:hover {
    color: ${colors.primary};
  }

  &.active {
    color: ${colors.primary};
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
