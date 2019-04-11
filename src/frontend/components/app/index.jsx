import React from 'react'
import { connect } from "react-redux"
import { Switch, Route } from "react-router-dom"
import Sidebar from '../sidebar'
import Topbar from '../topbar'
import ViewHelpers from '../../../backend/utils/view-helpers'

import Dashboard from '../dashboard'
import Resource from '../resource'
import ResourceAction from '../resource-action'
import RecordAction from '../record-action'

class App extends React.Component {
  render() {
    const h = new ViewHelpers({ options: this.props.paths })
    const resourceId = ':resourceId'
    const actionName = ':actionName'
    const recordId = ':recordId'
    return (
      <div className="columns container-main">
        <Sidebar />
        <div className="column content-wrapper">
          <Topbar />
          <Switch>
              <Route path={h.dashboardUrl()} exact component={Dashboard} />
              <Route path={h.listUrl({ resourceId })} exact component={Resource} />
              <Route path={h.resourceActionUrl({ resourceId, actionName })} exact component={ ResourceAction } />
              <Route path={h.recordActionUrl({ resourceId, recordId, actionName})} exact component={ RecordAction } />
          </Switch>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  paths: state.paths,
})

export default connect(mapStateToProps)(App)
