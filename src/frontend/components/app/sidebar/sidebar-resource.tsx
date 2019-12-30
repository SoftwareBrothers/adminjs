import React from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import SidebarLink from './styled/sidebar-link.styled'


type Props = {
  resource: ResourceJSON;
}

const SidebarResource: React.FC<Props & RouteComponentProps> = (props) => {
  const { resource } = props
  const isActive = (match, location): boolean => !!location.pathname.match(`/resources/${resource.id}/`)
  return (
    <li>
      <SidebarLink to={resource.href} isActive={isActive} data-testid="sidebar-resource-link">
        {resource.name}
      </SidebarLink>
    </li>
  )
}

export default withRouter(SidebarResource)
