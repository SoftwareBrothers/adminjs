import React from 'react'
import { useSelector } from 'react-redux'

import SidebarBranding from './sidebar-branding'
import SidebarParent from './sidebar-parent'
import SidebarPages from './sidebar-pages'
import groupResources from './utils/group-resources'
import { ReduxState } from '../../../store/store'
import { Navigation, Box, Label } from '../../design-system'
import SidebarFooter from './sidebar-footer'
import { useTranslation } from '../../../hooks/use-translation'
import { cssClass } from '../../design-system/utils/css-class'

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
        {groupResources(resources).map(parent => (
          <SidebarParent parent={parent} key={parent.name} />
        ))}
      </Box>
      <SidebarPages pages={pages} />
      {branding.softwareBrothers && <SidebarFooter />}
    </Navigation>
  )
}

export default Sidebar
