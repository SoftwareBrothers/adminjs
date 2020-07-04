import React, { FC } from 'react'
import groupResources from './utils/group-resources'
import SidebarParent from './sidebar-parent'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import allowOverride from '../../../hoc/allow-override'

export type SidebarResourceSectionProps = {
    resources: ResourceJSON[];
}

/**
 * Groups resources by sections and renders the list in {@link Sidebar}
 *
 * @component
 * @subcategory Molecules
 */
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
