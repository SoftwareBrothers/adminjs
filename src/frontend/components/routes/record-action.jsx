import React from 'react'
import { connect } from "react-redux"
import ViewHelpers from '../../../backend/utils/view-helpers'
import { Breadcrumbs, ActionHeader, ActionWrapper } from '../layout'

import actions from '../actions'

class RecordAction extends React.Component {
  static actionComponent({ action, isClient }) {
    let Action = actions[action.name]
    if (isClient && action.component) {
      Action = AdminBro.Components[action.component]
    }
    return Action || (() => (<div />))
  }

  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
      recordTitle: ''
    }
  }

  componentDidMount() {
    this.setState({ isClient: true })
  }

  render() {
    const h = new ViewHelpers()

    const { match, resources} = this.props
    const { resourceId, actionName, recordId } = match.params
    const { isClient } = this.state

    const resource = resources.find(r => r.id === resourceId)
    const action = resource.recordActions.find(r => r.name === actionName)

    const Action = RecordAction.actionComponent({ action, isClient })
    
    return (
      <ActionWrapper>
        <Breadcrumbs resource={resource} actionName={actionName} recordTitle={this.state.recordTitle}/>
        <ActionHeader
          resource={resource}
          recordId={recordId}
          action={action}
        />
        <Action action={action} resource={resource} recordId={recordId}/>
      </ActionWrapper>
    )
  }
}


const mapStateToProps = (state) => ({
  resources: state.resources,
})

export default connect(mapStateToProps)(RecordAction)
