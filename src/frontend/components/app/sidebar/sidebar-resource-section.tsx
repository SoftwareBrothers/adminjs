import React, { FC } from 'react'
import groupResources from './utils/group-resources'
import SidebarParent from './sidebar-parent'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import allowOverride from '../../../hoc/allow-override'

type SidebarResourceSectionProps = {
    resources: ResourceJSON[];
}

const SidebarResourceSection: FC<SidebarResourceSectionProps> = ({ resources }) => {
  const groupedResources = groupResources(resources)

  return (
    <>
      {
        groupedResources
          .map(parent => (
            <SidebarParent parent={parent} key={parent.name} />
          ))
      }
    </>
  )
}

export default allowOverride(SidebarResourceSection, 'SidebarResourceSection')
