import React, { useState } from 'react'
import { connect } from 'react-redux'

import SidebarBranding from './sidebar-branding'
import SidebarParent from './sidebar-parent'
import SidebarFooter from './sidebar-footer'
import SidebarPages from './sidebar-pages'
import groupResources from './utils/group-resources'
import Hamburger from './hamburger'
import { ReduxState } from '../../../store/store'
import SidebarLabel from './styled/sidebar-label.styled'
import SidebarWrapper from './styled/sidebar-wrapper.styled'
import SidebarSection from './styled/sidebar-section.styled'

type Props = Pick<ReduxState, 'resources' | 'branding' | 'pages'>

const Sidebar: React.FC<Props> = (props) => {
  const { branding, resources, pages } = props
  const [hidden, setHidden] = useState(false)
  return (
    <SidebarWrapper className={hidden ? 'hidden' : 'active'}>
      <SidebarSection>
        <Hamburger onClick={(): void => setHidden(!hidden)} />
        <SidebarBranding branding={branding} />
      </SidebarSection>
      <SidebarSection style={{ flexGrow: 1 }}>
        <SidebarLabel>Navigation</SidebarLabel>
        <ul>
          {groupResources(resources).map(parent => (
            <SidebarParent parent={parent} key={parent.name} />
          ))}
        </ul>
      </SidebarSection>
      <SidebarPages pages={pages} />
      {branding.softwareBrothers && <SidebarFooter hidden={hidden} />}
    </SidebarWrapper>
  )
}

const mapStateToProps = (state: ReduxState): Props => ({
  resources: state.resources,
  branding: state.branding,
  pages: state.pages,
})

export default connect(mapStateToProps)(Sidebar)
