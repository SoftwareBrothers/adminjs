import React, { FC } from 'react'
import { Box, cssClass, Navigation } from '@admin-bro/design-system'
import { useHistory, useLocation } from 'react-router'
import { useTranslation } from '../../../hooks/use-translation'
import groupResources from './utils/group-resources'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import allowOverride from '../../../hoc/allow-override'
import { useLocalStorage } from '../../../hooks'

/**
 * @alias SidebarResourceSectionProps
 * @memberof SidebarResourceSection
 */
export type SidebarResourceSectionProps = {
  /** List of the resources which should be rendered */
  resources: Array<ResourceJSON>;
}

const isSelected = (href, location): boolean => {
  const regExp = new RegExp(`${href}($|/)`)
  return !!location.pathname.match(regExp)
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
  const [openElements, setOpenElements] = useLocalStorage<Record<string, boolean>>(
    'sidebarElements', {},
  )
  const history = useHistory()
  const location = useLocation()

  const elements = groupResources(resources).map((element, index) => ({
    ...element,
    onClick: (): void => setOpenElements({
      ...openElements,
      [index]: !openElements[index],
    }),
    isOpen: !!openElements[index],
    elements: element.elements?.map(subElement => ({
      ...subElement,
      onClick: (event): void => {
        if (subElement.href) {
          event.preventDefault()
          history.push(subElement.href)
        }
      },
      isSelected: isSelected(subElement.href, location),
    })),
  }))
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
