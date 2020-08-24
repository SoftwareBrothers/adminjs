import React, { FC } from 'react'
import groupResources from './utils/group-resources'
import SidebarParent from './sidebar-parent'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import allowOverride from '../../../hoc/allow-override'

/**
 * @alias SidebarResourceSectionProps
 * @memberof SidebarResourceSection
 */
export type SidebarResourceSectionProps = {
  /** List of the resources which should be rendered */
  resources: Array<ResourceJSON>;
}

/**
 * Groups resources by sections and renders the list in {@link Sidebar}
 *
 * ### Usage
 *
 * ```
 * import { SidebarResourceSection } from 'admin-bro`
 * ```
 *
 * @component
 * @subcategory Application
 * @name SidebarResourceSection
 */
const SidebarResourceSectionOriginal: FC<SidebarResourceSectionProps> = ({ resources }) => {
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

// Rollup cannot handle type exports well - that is why we need to do this hack with
// exporting default and named SidebarResourceSection
const SidebarResourceSection = allowOverride(SidebarResourceSectionOriginal, 'SidebarResourceSection')

export { SidebarResourceSection }
export default SidebarResourceSection
