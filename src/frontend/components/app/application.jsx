import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import ViewHelpers from '../../../backend/utils/view-helpers'
import Sidebar from './sidebar'
import Topbar from './topbar'
import { pathsType } from '../../types'

import {
  Dashboard, ResourceAction, RecordAction,
} from '../routes'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
      width: 100%;
      height: 100%;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
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
  background: ${({ theme }) => theme.colors.bck};
  display: flex;
  flex-direction: column;
`

const App = (props) => {
  const { paths } = props
  const h = new ViewHelpers({ options: paths })

  const resourceId = ':resourceId'
  const actionName = ':actionName'
  const recordId = ':recordId'

  const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })

  return (
    <React.Fragment>
      <GlobalStyle />
      <ApplicationWrapper>
        <Sidebar />
        <Core>
          <Topbar />
          <Switch>
            <Route path={h.dashboardUrl()} exact component={Dashboard} />
            <Route path={resourceActionUrl} exact component={ResourceAction} />
            <Route path={recordActionUrl} exact component={RecordAction} />
          </Switch>
        </Core>
      </ApplicationWrapper>
    </React.Fragment>
  )
}

App.propTypes = {
  paths: pathsType.isRequired,
}

const mapStateToProps = state => ({
  paths: state.paths,
})

export default connect(mapStateToProps)(App)
