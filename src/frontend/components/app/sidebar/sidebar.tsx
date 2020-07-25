import React from 'react'
import { useSelector } from 'react-redux'
import { Navigation, Box, Label, cssClass } from '@admin-bro/design-system'

import SidebarBranding from './sidebar-branding'
import SidebarPages from './sidebar-pages'
import { ReduxState } from '../../../store/store'
import SidebarFooter from './sidebar-footer'
import { useTranslation } from '../../../hooks/use-translation'

import SidebarResourceSection from './sidebar-resource-section'

type Props = {
  isVisible: boolean;
}

const Sidebar: React.FC<Props> = (props) => {
  const { isVisible } = props
  const [branding, resources, pages] = useSelector((state: ReduxState) => [
    state.branding, state.resources, state.pages,
  ])

  const { translateLabel } = useTranslation()

  return (
    <Navigation
      className={isVisible ? 'visible' : 'hidden'}
      position={['absolute', 'absolute', 'absolute', 'absolute', 'inherit']}
    >
      <Box flexShrink={0} px="lg" pb="xxl" className={cssClass('Logo')}>
        <SidebarBranding branding={branding} />
      </Box>
      <Box flexGrow={1} className={cssClass('Resources')}>
        <Label uppercase ml="lg" color="grey60">{translateLabel('navigation')}</Label>
        <SidebarResourceSection resources={resources} />
      </Box>
      <SidebarPages pages={pages} />
      {branding.softwareBrothers && <SidebarFooter />}
    </Navigation>
  )
}

export default Sidebar
