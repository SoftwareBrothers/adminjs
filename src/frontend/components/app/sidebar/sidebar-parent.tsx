import React, { ReactNode } from 'react'

import SidebarResource from './sidebar-resource'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import { NavGroup } from '../../design-system'


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
      <NavGroup icon={icon} title={name}>
        {resources.map(resource => (
          <SidebarResource
            resource={resource}
            key={resource.id}
          />
        ))}
      </NavGroup>
    )
  }
}
export default SidebarParent
