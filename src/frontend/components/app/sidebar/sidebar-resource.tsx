import React from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Text } from '@admin-bro/design-system'

import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import SidebarLink from './styled/sidebar-link.styled'


type Props = {
  resource: ResourceJSON;
}

const SidebarResource: React.FC<Props & RouteComponentProps> = (props) => {
  const { resource } = props
  const regExp = new RegExp(`/resources/${resource.id}($|/)`)
  const isActive = (match, location): boolean => !!location.pathname.match(regExp)
  if (!resource.href) {
    return null
  }
  return (
    <SidebarLink to={resource.href} isActive={isActive} data-testid="sidebar-resource-link">
      <Text as="span">{resource.name}</Text>
    </SidebarLink>
  )
}

export default withRouter(SidebarResource)
