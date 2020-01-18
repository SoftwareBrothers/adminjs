import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import ViewHelpers from '../../backend/utils/view-helpers'
import Sidebar from './app/sidebar/sidebar'
import TopBar from './app/top-bar'

import {
  Dashboard, ResourceAction, RecordAction, Page, BulkAction, DesignSystem,
} from './routes'

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

const Drawer = styled.div`
  position: fixed;
  right: 0;
  top:0;
  height: 100%;
  width: 400px;
  background: ${({ theme }): string => theme.colors.white};
  border-left: 1px solid ${({ theme }): string => theme.colors.border};
`

const App: React.FC = () => {
  const h = new ViewHelpers()

  const resourceId = ':resourceId'
  const actionName = ':actionName'
  const recordId = ':recordId'
  const pageName = ':pageName'

  const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
  const resourceUrl = h.resourceUrl({ resourceId })
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
  const bulkActionUrl = h.bulkActionUrl({ resourceId, actionName })
  const pageUrl = h.pageUrl(pageName)
  const designSystemUrl = h.designSystemUrl()

  return (
    <React.Fragment>
      <GlobalStyle />
      <ApplicationWrapper>
        <Sidebar />
        <Core>
          <TopBar />
          <Switch>
            <Route path={h.dashboardUrl()} exact component={Dashboard} />
            <Route path={pageUrl} exact component={Page} />
            <Route path={designSystemUrl} exact component={DesignSystem} />
            <Route
              path={resourceUrl}
              render={props => <ResourceAction {...props} match={{ ...props.match, params: { ...props.match.params, actionName: 'list' } }} />}
            />
          </Switch>
        </Core>
        <Switch>
          <Route path={recordActionUrl} exact component={RecordAction} />
          <Route path={bulkActionUrl} exact component={BulkAction} />
          <Route path={resourceActionUrl} exact component={ResourceAction} />
        </Switch>
      </ApplicationWrapper>
    </React.Fragment>
  )
}

export default App
