import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { pathsType, brandingType, resourceType } from '../../../types'

import SidebarBranding from './sidebar-branding'
import SidebarParent from './sidebar-parent'
import SidebarFooter from './sidebar-footer'
import groupResources from './group-resources'
import Hamburger from './hamburger'

const SidebarWrapper = styled.aside`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  width: ${({ theme }) => theme.sizes.sidebarWidth};
  transition: width 0.5s;

  & > section {
    padding: ${({ theme }) => `${theme.sizes.padding} ${theme.sizes.paddingLayout} ${theme.sizes.paddingLayout}`};
    width:  ${({ theme }) => theme.sizes.sidebarWidth};
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
      padding:  ${({ theme }) => theme.sizes.padding} 4px;
      transition: padding 0.5s;
      & > section {
        opacity: 0;
        transition: opacity 0.5s;
      }
    }
  }
`

const SidebarLabel = styled.h2`
  margin-top: ${({ theme }) => theme.sizes.padding};
  margin-left: ${({ theme }) => theme.sizes.padding};
  margin-bottom: ${({ theme }) => theme.sizes.padding};
  color: ${({ theme }) => theme.colors.lightText};
  font-size: ${({ theme }) => theme.fonts.min};
  text-transform: uppercase;
  letter-spacing: .1em;
`

const Sidebar = (props) => {
  const { branding, paths, resources } = props
  const [hidden, setHidden] = useState(false)
  return (
    <SidebarWrapper className={hidden ? 'hidden' : 'active'}>
      <section>
        <Hamburger onClick={() => setHidden(!hidden)} />
        <section>
          <SidebarBranding branding={branding} paths={paths} />
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

Sidebar.propTypes = {
  paths: pathsType.isRequired,
  branding: brandingType.isRequired,
  resources: PropTypes.arrayOf(resourceType).isRequired,
}

const mapStateToProps = state => ({
  resources: state.resources,
  branding: state.branding,
  paths: state.paths,
  versionsType: state.versionsType,
})

export default connect(mapStateToProps)(Sidebar)
