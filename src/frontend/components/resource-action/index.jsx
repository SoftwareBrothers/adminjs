import React from 'react'
import { connect } from "react-redux"

import Breadcrumbs from '../breadcrumbs'
import { Link } from 'react-router-dom'
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
      <div className="view-edit">
        <Breadcrumbs resource={resource} actionName={actionName}/>
        <div className="level">
          <h3 className="title">
            <Link to={h.listUrl(resource.id)} className="button is-text is-back">
              <span className="icon is-small"><i className="icomoon-pagination-left"></i></span>
            </Link>
            {action.label}
          </h3>
        </div>
        <Action action={action} resource={resource} paths={this.props.paths} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  paths: state.paths,
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)
