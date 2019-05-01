/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { actionType, locationType, historyType } from '../../types'
import StyledButton from './styled-button'
import ApiClient from '../../utils/api-client'
import ViewHelpers from '../../../backend/utils/view-helpers'
import withNotice from '../../store/with-notice'

class ActionButton extends React.PureComponent {
  handleClick(event) {
    const {
      action, resourceId, recordId, location,
      history, actionPerformed, addNotice,
    } = this.props

    if (action.guard && !confirm(action.guard)) {
      event.preventDefault()
      return
    }
    if (typeof action.component !== 'undefined' && action.component === false) {
      event.preventDefault()
      const api = new ApiClient()
      const apiAction = recordId ? api.recordAction : api.resourceAction

      apiAction.bind(api)({
        resourceId, actionName: action.name, recordId,
      }).then((response) => {
        addNotice({
          message: 'Record has been successfully removed',
        })
        if (location.pathname !== response.data.redirectUrl) {
          history.push(response.data.redirectUrl)
        }
        if (actionPerformed) {
          actionPerformed(action.name)
        }
      })
    }
  }

  render() {
    const h = new ViewHelpers()
    const {
      resourceId, recordId, action, className,
    } = this.props
    const actionName = action.name
    const href = recordId
      ? h.recordActionUrl({ resourceId, recordId, actionName })
      : h.resourceActionUrl({ resourceId, actionName })
    return (
      <StyledButton
        to={href}
        className={`button ${className}`}
        onClick={this.handleClick.bind(this)}
      >
        <span className="icon">
          <i className={action.icon} />
        </span>
        <div className="btn-text">
          {action.label}
        </div>
      </StyledButton>
    )
  }
}

ActionButton.propTypes = {
  action: actionType.isRequired,
  className: PropTypes.string.isRequired,
  resourceId: PropTypes.string.isRequired,
  recordId: PropTypes.string,
  location: locationType.isRequired,
  history: historyType.isRequired,
  actionPerformed: PropTypes.func,
  addNotice: PropTypes.func,
}

ActionButton.defaultProps = {
  recordId: null,
  actionPerformed: null,
}

export default withNotice(withRouter(ActionButton))
