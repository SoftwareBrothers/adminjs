import React from 'react'
import { Navigation, NavigationElementProps } from '@adminjs/design-system'
import { useNavigate, useLocation } from 'react-router'

import ViewHelpers from '../../../../backend/utils/view-helpers/view-helpers.js'
import { useTranslation } from '../../../hooks/use-translation.js'
import { ReduxState } from '../../../store/store.js'
import allowOverride from '../../../hoc/allow-override.js'

type Props = {
  pages?: ReduxState['pages'];
}

const h = new ViewHelpers()

const SidebarPages: React.FC<Props> = (props) => {
  const { pages } = props

  const { translateLabel, translatePage } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  if (!pages || !pages.length) {
    return null
  }

  const isActive = (page): boolean => (
    !!location.pathname.match(`/pages/${page.name}`)
  )

  const elements: Array<NavigationElementProps> = pages.map((page) => ({
    id: page.name,
    label: translatePage(page.name),
    isSelected: isActive(page),
    icon: page.icon,
    href: h.pageUrl(page.name),
    onClick: (event, element): void => {
      event.preventDefault()
      if (element.href) {
        navigate(element.href)
      }
    },
  }))

  return (
    <Navigation
      label={translateLabel('pages')}
      elements={elements}
    />
  )
}

export default allowOverride(SidebarPages, 'SidebarPages')
export { SidebarPages as OriginalSidebarPages, SidebarPages }
