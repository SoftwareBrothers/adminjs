import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ApiClient from '../../../utils/api-client'
import ViewHelpers from '../../../../backend/utils/view-helpers'

class ActionBtn extends React.PureComponent {
  handleClick(event) {
    if(this.props.action.guard && !confirm(this.props.action.guard)) {
      event.preventDefault()
      return
    }
    if(typeof this.props.action.component !== 'undefined' && this.props.action.component === false) {
      event.preventDefault()
      const api = new ApiClient()
      api.recordAction({
        resourceId: this.props.resourceId,
        actionName: this.props.action.name,
        recordId: this.props.recordId,
      }).then((response) => {
        if (this.props.location.pathname !== response.data.redirectUrl){
          this.props.history.push(response.data.redirectUrl)
        }
        if (this.props.actionPerformed) {
          this.props.actionPerformed()
        }
      })
    }
  }

  render() {
    const h = new ViewHelpers()
    const { resourceId, recordId } = this.props
    const actionName = this.props.action.name
    const href = this.props.recordId ?
      h.recordActionUrl({ resourceId, recordId, actionName }) :
      h.resourceActionUrl({ resourceId, actionName })
    return (
      <div className="control">
        <Link
          to={href}
          className={"button " + this.props.className}
          onClick={this.handleClick.bind(this)}>
          <span className="icon"><i className={this.props.action.icon}></i></span>
          <div className="btn-text">
            {this.props.action.label}
          </div>
        </Link>
      </div>
    )
  }
}

export default withRouter(ActionBtn)