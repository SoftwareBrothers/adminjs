/* eslint-disable react/no-children-prop */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import ViewHelpers from '../../backend/utils/view-helpers'
import Sidebar from './app/sidebar/sidebar'
import TopBar from './app/top-bar'
import normalize from './design-system/utils/normalize.styles'

import {
  Dashboard, ResourceAction, RecordAction, Page, BulkAction, DesignSystem, Resource,
} from './routes'
import { Drawer } from './design-system'

const GlobalStyle = createGlobalStyle`
  ${normalize};
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
      color: ${({ theme }): string => theme.colors.blueHover};
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
  const pageName = ':pageName'

  const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
  const bulkActionUrl = h.bulkActionUrl({ resourceId, actionName })
  const resourceUrl = h.resourceUrl({ resourceId })
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
            <Route path={resourceUrl} component={Resource} />
          </Switch>
          <Route
            path={recordActionUrl}
            children={props => (
              <Drawer hidden={!props.match}>
                {props.match && <RecordAction {...props} />}
              </Drawer>
            )}
          />
          <Route
            path={bulkActionUrl}
            children={props => (
              <Drawer hidden={!props.match}>
                {props.match && <BulkAction {...props} />}
              </Drawer>
            )}
          />
          <Route
            path={resourceActionUrl}
            children={props => (
              <Drawer hidden={!props.match}>
                {props.match && <ResourceAction {...props as any} />}
              </Drawer>
            )}
          />
        </Core>
      </ApplicationWrapper>
    </React.Fragment>
  )
}

export default App
