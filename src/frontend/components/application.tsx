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
import allowOverride from '../hoc/allow-override'
import {
  DashboardRoute, ResourceActionRoute, RecordActionRoute, PageRoute, BulkActionRoute, ResourceRoute,
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

  const dashboardUrl = h.dashboardUrl()
  const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
  const bulkActionUrl = h.bulkActionUrl({ resourceId, actionName })
  const resourceUrl = h.resourceUrl({ resourceId })
  const pageUrl = h.pageUrl(pageName)

  /**
   * When defining AdminJS routes, we use Routes component twice.
   * This results in warnings appearing in console, for example about not being able to locate
   * "/admin" route. They can be safely ignored though and should appear only
   * in development environment. The warnings originate from the difference between
   * "Switch" component that AdminJS had used in "react-router" v5 which was later replaced
   * with "Routes" in "react-router" v6. "Switch" would use the first "Route" component
   * that matched the provided path, while "Routes" searches for the best matching pattern.
   * In AdminJS we use "DrawerPortal" to display actions in a drawer when
   * "showInDrawer" option is set to true. The drawer should appear above the currently viewed
   * page, but "Routes" broke this behavior because it instead showed a record action route with
   * an empty background.
   * The current flow is that first "Routes" component includes "Resource" route component
   * for drawer-placed actions and the second "Routes" is entered for record actions
   * on a separate page.
   */
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Box height="100%" flex data-css="app">
        {sidebarVisible ? (
          <Overlay
            onClick={(): void => toggleSidebar(!sidebarVisible)}
          />
        ) : null}
        <Sidebar isVisible={sidebarVisible} data-css="sidebar" />
        <Box flex flexGrow={1} flexDirection="column" overflowY="auto" bg="bg" data-css="app-content">
          <TopBar toggleSidebar={() => toggleSidebar(!sidebarVisible)} />
          <Box position="absolute" top={0} zIndex={2000} data-css="notice">
            <Notice />
          </Box>
          <Routes>
            <Route path={`${resourceUrl}/*`} element={<ResourceRoute />} />
            <Route path={pageUrl} element={<PageRoute />} />
            <Route path={dashboardUrl} element={<DashboardRoute />} />
          </Routes>
          <Routes>
            <Route path={`${resourceActionUrl}/*`} element={<ResourceActionRoute />} />
            <Route path={`${bulkActionUrl}/*`} element={<BulkActionRoute />} />
            <Route path={`${recordActionUrl}/*`} element={<RecordActionRoute />} />
          </Routes>
        </Box>
      </Box>
    </>

  )
}

export default allowOverride(App, 'Application')
