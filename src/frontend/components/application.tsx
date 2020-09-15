/* eslint-disable react/no-children-prop */
import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { Box, Overlay } from '@admin-bro/design-system'

import ViewHelpers from '../../backend/utils/view-helpers'
import Sidebar from './app/sidebar/sidebar'
import TopBar from './app/top-bar'
import Notice from './app/notice'
import { ReduxState } from '../store/store'
import { useSidebar } from '../hooks/use-sidebar'

import {
  Dashboard, ResourceAction, RecordAction, Page, BulkAction, Resource,
} from './routes'
import isMobileDevice from '../utils/isMobileDevice'

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
  const [sidebar] = useSelector((state: ReduxState) => [
    state.sidebar,
  ])

  const { toggleSidebar } = useSidebar()

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
        {sidebar.isOpen ? (
          <Overlay
            hidden={!isMobileDevice()}
            onClick={(): void => toggleSidebar()}
          />
        ) : null}
        <Sidebar isVisible={sidebar.isOpen} />
        <Box flex flexGrow={1} flexDirection="column" overflowY="auto" bg="bg">
          <TopBar toggleSidebar={(): void => toggleSidebar()} />
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
