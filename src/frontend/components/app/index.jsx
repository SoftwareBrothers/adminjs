import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import ViewHelpers from '../../../backend/utils/view-helpers'
import { Sidebar, Topbar } from '../layout'
import { pathsType } from '../../types'
import { colors, sizes } from '../../styles/variables'

import {
  Resource, Dashboard, ResourceAction, RecordAction,
} from '../routes'
import Hamburger from '../layout/sidebar/hamburger'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
      width: 100%;
      height: 100%;
  }

  a {
    color: ${colors.primary};
  }
`

const ApplicationWrapper = styled.section`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: row;
  height: 100%;
`

const Core = styled.section`
  height: 100%;
  overflow-y: auto;
  width: 100%;
  background: ${colors.bck};
  display: flex;
  flex-direction: column;
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarActive: true,
    }
  }

  toggleSidebar() {
    this.setState(state => ({
      sidebarActive: !state.sidebarActive,
    }))
  }

  render() {
    const { paths } = this.props
    const { sidebarActive } = this.state
    const h = new ViewHelpers({ options: paths })

    const resourceId = ':resourceId'
    const actionName = ':actionName'
    const recordId = ':recordId'

    const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
    const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
    const listUrl = h.listUrl({ resourceId })

    return (
      <React.Fragment>
        <GlobalStyle />
        <ApplicationWrapper>
          <Sidebar sidebarActive={sidebarActive} />
          <Core>
            <Topbar toggleSidebar={this.toggleSidebar.bind(this)} />
            <Switch>
              <Route path={h.dashboardUrl()} exact component={Dashboard} />
              <Route path={listUrl} exact component={Resource} />
              <Route path={resourceActionUrl} exact component={ResourceAction} />
              <Route path={recordActionUrl} exact component={RecordAction} />
            </Switch>
          </Core>
        </ApplicationWrapper>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  paths: pathsType.isRequired,
}

const mapStateToProps = state => ({
  paths: state.paths,
})

export default connect(mapStateToProps)(App)
