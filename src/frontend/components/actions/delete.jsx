import React from 'react'
import { withRouter } from 'react-router-dom'
import { Loader } from '../layout'
import ApiClient from '../../utils/api-client'

class Delete extends React.PureComponent {
  componentDidMount() {
    const api = new ApiClient()
    api.recordAction({
      resourceId: this.props.resource.id,
      actionName: this.props.action.name,
      recordId: this.props.recordId,
    }).then((response) => {
      this.props.history.push(response.data.redirectUrl)
    })
  }

  render() {
    return (
      <Loader />
    )
  }
}

export default withRouter(Delete)