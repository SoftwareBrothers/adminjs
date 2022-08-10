/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { Box, Overlay, Reset } from '@adminjs/design-system'

import { useLocation } from 'react-router'
import ViewHelpers from '../../backend/utils/view-helpers/view-helpers'
import Sidebar from './app/sidebar/sidebar'
import TopBar from './app/top-bar'
import Notice from './app/notice'

import {
  Dashboard, ResourceAction, RecordAction, Page, BulkAction, Resource,
} from './routes'
import useHistoryListen from '../hooks/use-history-listen'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: ${({ theme }): string => theme.colors.grey100}
  }
`

const h = new ViewHelpers()

const App: React.FC = () => {
  const [sidebarVisible, toggleSidebar] = useState(false)
  const location = useLocation()

  useHistoryListen()

  useEffect(() => {
    if (sidebarVisible) { toggleSidebar(false) }
  }, [location])

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
    <>
      <Reset />
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
          <Box position="absolute" top={0} zIndex={2000}>
            <Notice />
          </Box>
          <Routes>
            <Route path={h.dashboardUrl()} element={<Dashboard />} />
            <Route path={`${resourceUrl}/*`} element={<Resource />} />
            <Route path={pageUrl} element={<Page />} />
            <Route path={`${recordActionUrl}/*`} element={<RecordAction />} />
            <Route path={`${resourceActionUrl}/*`} element={<ResourceAction />} />
            <Route path={`${bulkActionUrl}/*`} element={<BulkAction />} />
          </Routes>
        </Box>
      </Box>
    </>

  )
}

export default App
