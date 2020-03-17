import React from 'react'

import SidebarResource from './sidebar-resource'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import { NavGroup, Box } from '../../design-system'
import { useTranslation } from '../../../hooks'
import { cssClass } from '../../design-system/utils/css-class'


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
  const { translateLabel } = useTranslation()

  if (!parent.name) {
    return (
      <Box pl="default" pb="xl" pt="sm" ml="sm" className={cssClass('SidebarParent')}>
        {resources.map(resource => (
          <SidebarResource
            resource={resource}
            key={resource.id}
          />
        ))}
      </Box>
    )
  }

  return (
    <NavGroup icon={icon} title={translateLabel(name)}>
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
