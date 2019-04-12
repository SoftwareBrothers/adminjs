import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import ViewHelpers from '../../../backend/utils/view-helpers'
import { Sidebar, Topbar } from '../layout'
import { pathsType } from '../../types'

import {
  Resource, Dashboard, ResourceAction, RecordAction,
} from '../routes'

const ApplicationWrapper = styled.div.attrs({
  className: 'columns',
})`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`

const App = (props) => {
  const { paths } = props
  const h = new ViewHelpers({ options: paths })

  const resourceId = ':resourceId'
  const actionName = ':actionName'
  const recordId = ':recordId'

  const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
  const listUrl = h.listUrl({ resourceId })

  return (
    <ApplicationWrapper>
      <Sidebar />
      <div className="column">
        <Topbar />
        <Switch>
          <Route path={h.dashboardUrl()} exact component={Dashboard} />
          <Route path={listUrl} exact component={Resource} />
          <Route path={resourceActionUrl} exact component={ResourceAction} />
          <Route path={recordActionUrl} exact component={RecordAction} />
        </Switch>
      </div>
    </ApplicationWrapper>
  )
}

App.propTypes = {
  paths: pathsType.isRequired,
}

const mapStateToProps = state => ({
  paths: state.paths,
})

export default connect(mapStateToProps)(App)
