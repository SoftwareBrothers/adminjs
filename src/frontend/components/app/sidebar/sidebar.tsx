import React from 'react'
import styled from 'styled-components/dist/styled-components.esm.js'
import { useSelector } from 'react-redux'
import { Box, cssClass, themeGet } from '@adminjs/design-system'

import { BrandingOptions } from '../../../../adminjs-options.interface.js'
import { ResourceJSON, PageJSON } from '../../../interfaces/index.js'
import SidebarBranding from './sidebar-branding.js'
import SidebarPages from './sidebar-pages.js'
import { ReduxState } from '../../../store/store.js'
import SidebarFooter from './sidebar-footer.js'
import SidebarResourceSection from './sidebar-resource-section.js'
import allowOverride from '../../../hoc/allow-override.js'

type Props = {
  isVisible: boolean;
};

const StyledSidebar = styled(Box)`
  transition: left 0.3s;
  top: 0;
  bottom: 0;
  flex-shrink: 0;
  overflow-y: auto;

  &.hidden {
    left: -${themeGet('sizes', 'sidebarWidth')};
  }
  &.visible {
    left: 0;
  }
`

StyledSidebar.defaultProps = {
  position: ['absolute', 'absolute', 'absolute', 'absolute', 'inherit'],
  width: 'sidebarWidth',
  borderRight: 'default',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 50,
  bg: 'white',
}

const SidebarOriginal: React.FC<Props> = (props) => {
  const { isVisible } = props
  const [branding, resources, pages]: [
    BrandingOptions,
    ResourceJSON[],
    PageJSON[]
  ] = useSelector((state: ReduxState) => [
    state.branding,
    state.resources,
    state.pages,
  ])

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

export { Sidebar }
export default Sidebar
