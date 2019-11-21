import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SidebarBranding from './sidebar-branding'
import SidebarParent from './sidebar-parent'
import SidebarFooter from './sidebar-footer'
import groupResources from './group-resources'
import Hamburger from './hamburger'
import { BrandingOptions, VersionSettings } from '../../../../admin-bro-options.interface'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'

const SidebarWrapper = styled.aside`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }): string => theme.colors.bck};
  border-right: 1px solid ${({ theme }): string => theme.colors.border};
  width: ${({ theme }): string => theme.sizes.sidebarWidth};
  transition: width 0.5s;

  & > section {
    padding: ${({ theme }): string => `${theme.sizes.padding} ${theme.sizes.paddingLayout} ${theme.sizes.paddingLayout}`};
    width:  ${({ theme }): string => theme.sizes.sidebarWidth};
    transition: padding 0.5s;
    & > section {
      opacity: 1;
      transition: opacity 0.5s;
    }
  }

  &.hidden {
    width: 50px;
    transition: width 0.5s;
    overflow: hidden;
    & > section {
      padding:  ${({ theme }): string => theme.sizes.padding} 4px;
      transition: padding 0.5s;
      & > section {
        opacity: 0;
        transition: opacity 0.5s;
      }
    }
  }
`

const SidebarLabel = styled.h2`
  margin-top: ${({ theme }): string => theme.sizes.padding};
  margin-left: ${({ theme }): string => theme.sizes.padding};
  margin-bottom: ${({ theme }): string => theme.sizes.padding};
  color: ${({ theme }): string => theme.colors.lightText};
  font-size: ${({ theme }): string => theme.fonts.min};
  text-transform: uppercase;
  letter-spacing: .1em;
`

type Props = {
  branding: BrandingOptions;
  resources: Array<ResourceJSON>;
}

const Sidebar: React.FC<Props> = (props) => {
  const { branding, resources } = props
  const [hidden, setHidden] = useState(false)
  return (
    <SidebarWrapper className={hidden ? 'hidden' : 'active'}>
      <section>
        <Hamburger onClick={(): void => setHidden(!hidden)} />
        <section>
          <SidebarBranding branding={branding} />
          <SidebarLabel>Navigation</SidebarLabel>
          <ul>
            {groupResources(resources).map(parent => (
              <SidebarParent parent={parent} key={parent.name} />
            ))}
          </ul>
        </section>
      </section>
      {branding.softwareBrothers && <SidebarFooter hidden={hidden} />}
    </SidebarWrapper>
  )
}

const mapStateToProps = (state): {
  resources: Array<ResourceJSON>;
  branding: BrandingOptions;
  versionsType: VersionSettings;
} => ({
  resources: state.resources,
  branding: state.branding,
  versionsType: state.versionsType,
})

export default connect(mapStateToProps)(Sidebar)
