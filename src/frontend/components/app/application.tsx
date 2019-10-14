import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import ViewHelpers from '../../../backend/utils/view-helpers'
import Sidebar from './sidebar'
import Topbar from './topbar'

import {
  Dashboard, ResourceAction, RecordAction,
} from '../routes'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
      width: 100%;
      height: 100%;
      background: ${({ theme }): string => theme.colors.bck};
      color: ${({ theme }): string => theme.colors.defaultText};
  }

  .content h1, .content h2, .content h3, .content h4, .content h5, .content h6 {
    color: ${({ theme }): string => theme.colors.defaultText};
  }

  a {
    color: ${({ theme }): string => theme.colors.primary};
    &:hover {
      color: ${({ theme }): string => theme.colors.primaryHover};
    }
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
  background: ${({ theme }): string => theme.colors.innerBck};
  display: flex;
  flex-direction: column;
`

const App: React.FC = () => {
  const h = new ViewHelpers()

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

export default App
