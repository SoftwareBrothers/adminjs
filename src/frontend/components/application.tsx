/* eslint-disable react/no-children-prop */
import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import ViewHelpers from '../../backend/utils/view-helpers'
import Sidebar from './app/sidebar/sidebar'
import TopBar from './app/top-bar'
import Notice from './app/notice'

import {
  Dashboard, ResourceAction, RecordAction, Page, BulkAction, Resource,
} from './routes'
import { Box, Overlay } from './design-system'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: ${({ theme }): string => theme.colors.grey100}
  }
`

const App: React.FC = () => {
  const [sidebarVisible, toggleSidebar] = useState(false)
  const h = new ViewHelpers()

  const resourceId = ':resourceId'
  const actionName = ':actionName'
  const recordId = ':recordId'
  const pageName = ':pageName'

  const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
  const bulkActionUrl = h.bulkActionUrl({ resourceId, actionName })
  const resourceUrl = h.resourceUrl({ resourceId })
  const pageUrl = h.pageUrl(pageName)

  return (
    <React.Fragment>
      <GlobalStyle />
      <Box height="100%" flex>
        {sidebarVisible ? (
          <Overlay
            onClick={(): void => toggleSidebar(!sidebarVisible)}
          />
        ) : null}
        <Sidebar isVisible={sidebarVisible} />
        <Box flex flexGrow={1} flexDirection="column" overflowY="auto" bg="bg">
          <TopBar toggleSidebar={(): void => toggleSidebar(!sidebarVisible)} />
          <Box position="absolute" top={0}>
            <Notice />
          </Box>
          <Switch>
            <Route path={h.dashboardUrl()} exact component={Dashboard} />
            <Route path={resourceUrl} component={Resource} />
            <Route path={pageUrl} exact component={Page} />
          </Switch>
          <Switch>
            <Route path={recordActionUrl} component={RecordAction} />
            <Route path={resourceActionUrl} component={ResourceAction} />
            <Route path={bulkActionUrl} component={BulkAction} />
          </Switch>
        </Box>
      </Box>
    </React.Fragment>

  )
}

export default App
