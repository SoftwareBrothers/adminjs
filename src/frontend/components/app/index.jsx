import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import ViewHelpers from '../../../backend/utils/view-helpers'
import { Sidebar, Topbar } from '../layout'

import {
  Resource, Dashboard, ResourceAction, RecordAction,
} from '../routes'

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
    <div className="columns container-main">
      <Sidebar />
      <div className="column content-wrapper">
        <Topbar />
        <Switch>
          <Route path={h.dashboardUrl()} exact component={Dashboard} />
          <Route path={listUrl} exact component={Resource} />
          <Route path={resourceActionUrl} exact component={ResourceAction} />
          <Route path={recordActionUrl} exact component={RecordAction} />
        </Switch>
      </div>
    </div>
  )
}

App.propTypes = {
  paths: PropTypes.shape({
    loginPath: PropTypes.string.isRequired,
    rootPath: PropTypes.string.isRequired,
    logoutPath: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  paths: state.paths,
})

export default connect(mapStateToProps)(App)
