import React from 'react'
import { useSelector } from 'react-redux'
import { Box, cssClass } from '@admin-bro/design-system'

import { BrandingOptions } from 'src/admin-bro-options.interface'
import ResourceJSON from 'src/backend/decorators/resource-json.interface'
import PageJSON from 'src/backend/decorators/page-json.interface'
import SidebarBranding from './sidebar-branding'
import SidebarPages from './sidebar-pages'
import { ReduxState } from '../../../store/store'
import SidebarFooter from './sidebar-footer'

import SidebarResourceSection from './sidebar-resource-section'

type Props = {
  isVisible: boolean;
}

const Sidebar: React.FC<Props> = (props) => {
  const { isVisible } = props
  const [branding, resources, pages]: [BrandingOptions, ResourceJSON[], PageJSON[]] = useSelector(
    (state: ReduxState) => [
      state.branding, state.resources, state.pages,
    ],
  )

  return (
    <Box
      className={isVisible ? 'visible' : 'hidden'}
      position={['absolute', 'absolute', 'absolute', 'absolute', 'inherit']}
      width="sidebarWidth"
      borderRight="default"
      display="flex"
      flexDirection="column"
    >
      <SidebarBranding branding={branding} />
      <Box flexGrow={1} className={cssClass('Resources')}>
        <SidebarResourceSection resources={resources} />
      </Box>
      <SidebarPages pages={pages} />
      {branding?.softwareBrothers && <SidebarFooter />}
    </Box>
  )
}

export default Sidebar
