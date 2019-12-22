import React, { ReactNode } from 'react'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import SidebarLink from './styled/sidebar-link.styled'

type Props = {
  resource: ResourceJSON;
}

class SidebarResource extends React.PureComponent<Props & RouteComponentProps> {
  render(): ReactNode {
    const { resource } = this.props
    return (
      <li>
        <SidebarLink to={resource.href}>
          {resource.name}
        </SidebarLink>
      </li>
    )
  }
}

export default withRouter(SidebarResource)
