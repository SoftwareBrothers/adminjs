import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { sizes, colors, fonts, breakpoints } from '../../../styles/variables'
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
  border-right: 1px solid ${colors.border};
  transition: width 0.5s;

  & > section {
    padding: ${sizes.paddingLayout};
    width: ${sizes.sidebarWidth};
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
  margin-top: ${sizes.padding};
  margin-left: ${sizes.padding};
  margin-bottom: ${sizes.padding};
  color: ${colors.lightText};
  font-size: ${fonts.min};
  text-transform: uppercase;
  letter-spacing: .1em;
`

const Sidebar = (props) => {
  const { branding, paths, resources, sidebarActive } = props
  return (
    <SidebarWrapper className={sidebarActive ? 'active' : 'hidden'}>
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
