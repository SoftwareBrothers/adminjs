import React, { ReactNode } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { RouteComponentProps } from 'react-router'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'

const ResourceLink = styled(NavLink)`
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

type Props = {
  resource: ResourceJSON;
}

class SidebarResource extends React.PureComponent<Props & RouteComponentProps> {
  render(): ReactNode {
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

export default withRouter(SidebarResource)
