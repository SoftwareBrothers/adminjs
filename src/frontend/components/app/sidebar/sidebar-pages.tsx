import React from 'react'
import { Box, Label, Text } from '@admin-bro/design-system'

import { ReduxState } from '../../../store/store'
import SidebarLink from './styled/sidebar-link.styled'
import ViewHelpers from '../../../../backend/utils/view-helpers'
import { useTranslation } from '../../../hooks/use-translation'

type Props = {
  pages?: ReduxState['pages'];
}

const SidebarPages: React.FC<Props> = (props) => {
  const { pages } = props

  const { translateLabel } = useTranslation()

  const h = new ViewHelpers()

  if (!pages || !pages.length) {
    return (<></>)
  }

  const isActive = (page, location): boolean => (
    !!location.pathname.match(`/pages/${page.name}`)
  )

  return (
    <Box ml="lg">
      <Label uppercase color="grey60" mb="lg">{translateLabel('pages')}</Label>
      {pages.map(page => (
        <SidebarLink
          to={h.pageUrl(page.name)}
          key={page.name}
          isActive={(match, location): boolean => isActive(page, location)}
          data-testid="sidebar-page-link"
        >
          <Text as="span">{translateLabel(page.name)}</Text>
        </SidebarLink>
      ))}
    </Box>
  )
}

export default SidebarPages
