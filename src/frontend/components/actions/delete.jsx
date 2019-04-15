import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Loader } from '../layout'
import ApiClient from '../../utils/api-client'
import { resourceType, actionType, historyType } from '../../types'

class Delete extends React.PureComponent {
  componentDidMount() {
    const { resource, action, recordId, history } = this.props
    const api = new ApiClient()
    api.recordAction({
      resourceId: resource.id,
      actionName: action.name,
      recordId,
    }).then((response) => {
      history.push(response.data.redirectUrl)
    })
  }

  render() {
    return (
      <Loader />
    )
  }
}

Delete.propTypes = {
  resource: resourceType.isRequired,
  action: actionType.isRequired,
  history: historyType.isRequired,
  recordId: PropTypes.string.isRequired,
}

export default withRouter(Delete)
