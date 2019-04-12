import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import ViewHelpers from '../../../backend/utils/view-helpers'
import { Breadcrumbs, ActionBtn } from '../layout'

import actions from '../actions'

class RecordAction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
      recordTitle: ''
    }
  }

  renderActionBtn(action) {
    const { resourceId, recordId } = this.props.match.params
    return (
      <ActionBtn
        action={action}
        key={action.name}
        className="is-primary"
        resourceId={resourceId}
        recordId={recordId} />
    )
  }

  componentDidMount() {
    this.setState({ isClient: true })
  }
  
  render() {
    const { resourceId, actionName, recordId } = this.props.match.params
    const resource = this.props.resources.find(r => r.id === resourceId)
    const action = resource.recordActions.find(r => r.name === actionName)
    const h = new ViewHelpers()
    let Action = actions[action.name]
    if (this.state.isClient && action.component) {
      Action = AdminBro.Components[action.component]
    }
    Action = Action || ((props) => (<div></div>))
    
    return (
      <div className="view-edit">
        <Breadcrumbs resource={resource} actionName={actionName} recordTitle={this.state.recordTitle}/>
        <div className="level">
          <h3 className="title">
            <Link to={h.listUrl({ resourceId: resource.id })} className="button is-text is-back">
              <span className="icon is-small"><i className="icomoon-pagination-left"></i></span>
            </Link>
            {action.label}
          </h3>
          <div className="field is-grouped">
            {resource.recordActions.filter(a => a.name !== actionName).map(action => {
              return this.renderActionBtn(action)
            })}
          </div>
        </div>
        <Action action={action} resource={resource} recordId={recordId}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  resources: state.resources,
})

export default connect(mapStateToProps)(RecordAction)
