/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */

import React, { ReactNode, ComponentClass } from 'react'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import StyledLink from '../ui/styled-link'
import ApiClient from '../../utils/api-client'
import ViewHelpers from '../../../backend/utils/view-helpers'
import withNotice, { AddNoticeProps } from '../../store/with-notice'
import ActionJSON from '../../../backend/decorators/action-json.interface'

/**
 * Renders Button for an action
 *
 * @private
 * @component
 */
class ActionButton extends React.PureComponent<RouteComponentProps & Props & AddNoticeProps> {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event): void {
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
      let apiAction
      if (recordId) {
        apiAction = api.recordAction
      } else {
        apiAction = api.resourceAction
      }

      apiAction.bind(api)({
        resourceId, actionName: action.name, recordId,
      }).then((response) => {
        addNotice({
          message: `action ${action.name} has been successfully performed`,
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

  render(): ReactNode {
    const h = new ViewHelpers()
    const {
      resourceId, recordId, action, className,
    } = this.props
    const actionName = action.name
    const href = recordId
      ? h.recordActionUrl({ resourceId, recordId, actionName })
      : h.resourceActionUrl({ resourceId, actionName })
    return (
      <StyledLink
        to={href}
        className={`button ${className}`}
        onClick={this.handleClick}
      >
        <span className="icon">
          <i className={action.icon} />
        </span>
        <div className="btn-text">
          {action.label}
        </div>
      </StyledLink>
    )
  }
}

type Props = {
  action: ActionJSON;
  className?: string;
  resourceId: string;
  recordId?: string;
  actionPerformed?: (actionName: string) => any;
}

// TODO - remove this hack
export default withRouter(withNotice(ActionButton)) as unknown as ComponentClass<Props>
