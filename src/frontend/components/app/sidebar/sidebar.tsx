import { Box, BoxProps, cssClass } from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'
import React from 'react'
import { useSelector } from 'react-redux'

import allowOverride from '../../../hoc/allow-override.js'
import { ReduxState } from '../../../store/store.js'
import SidebarBranding from './sidebar-branding.js'
import SidebarFooter from './sidebar-footer.js'
import SidebarPages from './sidebar-pages.js'
import SidebarResourceSection from './sidebar-resource-section.js'

export const SIDEBAR_Z_INDEX = 50

type Props = {
  isVisible: boolean
}

const StyledSidebar = styled(Box)<BoxProps>`
  top: 0;
  bottom: 0;
  overflow-y: auto;
  width: ${({ theme }) => theme.sizes.sidebarWidth};
  border-right: ${({ theme }) => theme.borders.default};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: ${SIDEBAR_Z_INDEX};
  background: ${({ theme }) => theme.colors.sidebar};

  transition: left 0.25s ease-in-out;

  &.hidden {
    left: -${({ theme }) => theme.sizes.sidebarWidth};
  }
  &.visible {
    left: 0;
  }
`

StyledSidebar.defaultProps = {
  position: ['absolute', 'absolute', 'absolute', 'absolute', 'initial'],
}

const SidebarOriginal: React.FC<Props> = (props) => {
  const { isVisible } = props
  const branding = useSelector((state: ReduxState) => state.branding)
  const resources = useSelector((state: ReduxState) => state.resources)
  const pages = useSelector((state: ReduxState) => state.pages)

  return (
    <StyledSidebar className={isVisible ? 'visible' : 'hidden'} data-css="sidebar">
      <SidebarBranding branding={branding} />
      <Box flexGrow={1} className={cssClass('Resources')} data-css="sidebar-resources">
        <SidebarResourceSection resources={resources} />
      </Box>
      <SidebarPages pages={pages} />
      <SidebarFooter />
    </StyledSidebar>
  )
}

const Sidebar = allowOverride(SidebarOriginal, 'Sidebar')

export { Sidebar, SidebarOriginal as OriginalSidebar }
export default Sidebar
