import React, { ReactNode } from 'react'

import SidebarResource from './sidebar-resource'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import { NavGroup } from '../../design-system'
import { useTranslation } from '../../../hooks'


type Props = {
  parent: {
    icon: string;
    name: string;
    resources: Array<ResourceJSON>;
  };
}

const SidebarParent: React.FC<Props> = (props) => {
  const { parent } = props
  const { icon, name, resources } = parent
  const { tl } = useTranslation()

  return (
    <NavGroup icon={icon} title={tl(name)}>
      {resources.map(resource => (
        <SidebarResource
          resource={resource}
          key={resource.id}
        />
      ))}
    </NavGroup>
  )
}
export default SidebarParent
