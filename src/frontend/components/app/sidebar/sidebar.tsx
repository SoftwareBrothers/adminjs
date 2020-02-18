import React from 'react'
import { connect } from 'react-redux'

import SidebarBranding from './sidebar-branding'
import SidebarParent from './sidebar-parent'
import SidebarPages from './sidebar-pages'
import groupResources from './utils/group-resources'
import { ReduxState } from '../../../store/store'
import { Navigation, Box, Label } from '../../design-system'
import SidebarFooter from './sidebar-footer'
import { useTranslation } from '../../../hooks/use-translation'

type Props = Pick<ReduxState, 'resources' | 'branding' | 'pages'>

const Sidebar: React.FC<Props> = (props) => {
  const { branding, resources, pages } = props

  const { translateLabel } = useTranslation()

  return (
    <Navigation>
      <Box flexShrink={0} px="lg" pb="xxl">
        <SidebarBranding branding={branding} />
      </Box>
      <Box flexGrow={1}>
        <Label uppercase ml="lg" color="grey">{translateLabel('navigation')}</Label>
        {groupResources(resources).map(parent => (
          <SidebarParent parent={parent} key={parent.name} />
        ))}
      </Box>
      <SidebarPages pages={pages} />
      {branding.softwareBrothers && <SidebarFooter />}
    </Navigation>
  )
}

const mapStateToProps = (state: ReduxState): Props => ({
  resources: state.resources,
  branding: state.branding,
  pages: state.pages,
})

export default connect(mapStateToProps)(Sidebar)
