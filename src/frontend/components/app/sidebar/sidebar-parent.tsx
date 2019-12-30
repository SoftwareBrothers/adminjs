import React, { ReactNode } from 'react'
import styled from 'styled-components'

import SidebarResource from './sidebar-resource'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import SidebarGroupTitle from './styled/sidebar-group-title.styled'

const ResourcesList = styled.ul`
  margin: ${({ theme }): string => theme.sizes.padding} 0;
  padding-left: 40px;
`

type Props = {
  parent: {
    icon: string;
    name: string;
    resources: Array<ResourceJSON>;
  };
}

class SidebarParent extends React.PureComponent<Props> {
  render(): ReactNode {
    const { parent } = this.props
    const { icon, name, resources } = parent

    return (
      <li>
        <SidebarGroupTitle>
          <i className={icon} />
          {name}
        </SidebarGroupTitle>
        <ResourcesList>
          {resources.map(resource => (
            <SidebarResource
              resource={resource}
              key={resource.id}
            />
          ))}
        </ResourcesList>
      </li>
    )
  }
}

export default SidebarParent
