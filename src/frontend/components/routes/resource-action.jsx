import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Breadcrumbs, ActionBtn, ActionHeader, ActionWrapper } from '../layout'

import ViewHelpers from '../../../backend/utils/view-helpers'
import actions from '../actions'

class ResourceAction extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isClient: false,
    }
  }

  componentDidMount(){
    this.setState({ isClient: true })
  }

  render() {
    const { resourceId, actionName } = this.props.match.params
    const resource = this.props.resources.find(r => r.id === resourceId)
    const action = resource.resourceActions.find(r => r.name === actionName)
    const h = new ViewHelpers()
    let Action = actions[action.name]
    if (this.state.isClient && action.component) {
      Action = AdminBro.Components[action.component]
    }
    Action = Action || ((props) => (<div></div>))

    return (
      <ActionWrapper>
        <Breadcrumbs resource={resource} actionName={actionName}/>
        <ActionHeader
          resource={resource}
          action={action}
        />
        <Action action={action} resource={resource} paths={this.props.paths} />
      </ActionWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  paths: state.paths,
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)
