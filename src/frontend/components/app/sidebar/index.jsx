import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { pathsType, brandingType, resourceType } from '../../../types'

import SidebarBranding from './sidebar-branding'
import SidebarParent from './sidebar-parent'
import SidebarFooter from './sidebar-footer'
import groupResources from './group-resources'

const SidebarWrapper = styled.aside`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: width 0.5s;

  & > section {
    padding: ${({ theme }) => theme.sizes.padding} ${({ theme }) => theme.sizes.paddingLayout} ${({ theme }) => theme.sizes.paddingLayout};
    width: ${({ theme }) => theme.sizes.sidebarWidth};
  }

  &.hidden {
    width: 0px;
    transition: width 0.5s;
    overflow: hidden;
    & > section {
      opacity: 0;
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
  return (
    <SidebarWrapper className="active">
      <section>
        <SidebarBranding branding={branding} paths={paths} />
        <SidebarLabel>Navigation</SidebarLabel>
        <ul>
          {groupResources(resources).map(parent => (
            <SidebarParent parent={parent} key={parent.name} />
          ))}
        </ul>
      </section>
      {branding.softwareBrothers && <SidebarFooter />}
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
})

export default connect(mapStateToProps)(Sidebar)
