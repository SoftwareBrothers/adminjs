/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box, Overlay } from '@adminjs/design-system'
import { useLocation } from 'react-router'

import ViewHelpers from '../../backend/utils/view-helpers/view-helpers.js'
import Sidebar, { SIDEBAR_Z_INDEX } from './app/sidebar/sidebar.js'
import TopBar from './app/top-bar.js'
import Notice from './app/notice.js'
import allowOverride from '../hoc/allow-override.js'
import { AdminModal as Modal } from './app/admin-modal.js'
import {
  DashboardRoute,
  ResourceActionRoute,
  RecordActionRoute,
  PageRoute,
  BulkActionRoute,
  ResourceRoute,
} from './routes/index.js'
import useHistoryListen from '../hooks/use-history-listen.js'
import { AuthenticationBackgroundComponent } from './app/auth-background-component.js'
import { Footer } from './app/footer.js'

const h = new ViewHelpers()

const App: React.FC = () => {
  const [sidebarVisible, toggleSidebar] = useState(false)
  const location = useLocation()

  useHistoryListen()

  useEffect(() => {
    if (sidebarVisible) {
      toggleSidebar(false)
    }
  }, [location])

  const resourceId = ':resourceId'
  const actionName = ':actionName'
  const recordId = ':recordId'
  const pageName = ':pageName'

  // Note: replaces are required so that record/resource/bulk actions urls
  // are relative to their parent route
  const dashboardUrl = h.dashboardUrl()
  const resourceUrl = h.resourceUrl({ resourceId })
  const recordActionUrl = h
    .recordActionUrl({ resourceId, recordId, actionName })
    .replace(resourceUrl, '').substring(1)
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
    .replace(resourceUrl, '').substring(1)
  const bulkActionUrl = h.bulkActionUrl({ resourceId, actionName })
    .replace(resourceUrl, '').substring(1)
  const pageUrl = h.pageUrl(pageName)

  return (
    <Box height="100%" flex data-css="app">
      {sidebarVisible ? (
        <Overlay
          onClick={(): void => toggleSidebar(!sidebarVisible)}
          zIndex={SIDEBAR_Z_INDEX - 1}
        />
      ) : null}
      <Sidebar isVisible={sidebarVisible} data-css="sidebar" />
      <Box flex flexGrow={1} flexDirection="column" overflowY="auto" bg="bg" data-css="app-content">
        <TopBar toggleSidebar={() => toggleSidebar(!sidebarVisible)} />
        <Box position="absolute" top={0} zIndex={2000} data-css="notice">
          <Notice />
        </Box>
        <Routes>
          <Route path={dashboardUrl}>
            <Route index element={<DashboardRoute />} />
          </Route>
          <Route path={resourceUrl}>
            <Route index element={<ResourceRoute />} />
            <Route path={bulkActionUrl} element={<BulkActionRoute />} />
            <Route path={resourceActionUrl} element={<ResourceActionRoute />} />
            <Route path={recordActionUrl} element={<RecordActionRoute />} />
          </Route>
          <Route path={pageUrl}>
            <Route index element={<PageRoute />} />
          </Route>
          <Route path="*" element={<DashboardRoute />} />
        </Routes>
        <Footer />
      </Box>
      <Modal />
      <AuthenticationBackgroundComponent />
    </Box>
  )
}

const OverridableApp = allowOverride(App, 'Application')

export {
  OverridableApp as default,
  OverridableApp as App,
  App as OriginalApp,
}
