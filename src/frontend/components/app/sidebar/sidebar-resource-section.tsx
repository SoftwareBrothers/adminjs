import React, { FC } from 'react'
import { Navigation } from '@admin-bro/design-system'
import { useTranslation } from '../../../hooks/use-translation'
import { ResourceJSON } from '../../../interfaces'
import allowOverride from '../../../hoc/allow-override'
import { useNavigationResources } from '../../../hooks'

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
  const elements = useNavigationResources(resources)

  const { translateLabel } = useTranslation()

  return (
    <Navigation
      label={translateLabel('navigation')}
      elements={elements}
    />
  )
}

// Rollup cannot handle type exports well - that is why we need to do this hack with
// exporting default and named SidebarResourceSection
const SidebarResourceSection = allowOverride(SidebarResourceSectionOriginal, 'SidebarResourceSection')

export { SidebarResourceSection }
export default SidebarResourceSection
