/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */

import React, { ReactNode, ComponentClass } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import { RouteComponentProps } from 'react-router'
import { AxiosResponse } from 'axios'
import ApiClient from '../../utils/api-client'
import ViewHelpers from '../../../backend/utils/view-helpers'
import withNotice, { AddNoticeProps } from '../../store/with-notice'
import ActionJSON from '../../../backend/decorators/action-json.interface'
import { ActionResponse } from '../../../backend/actions/action.interface'
import { appendForceRefresh } from '../actions/utils/append-force-refresh'


/**
 * @alias ActionButtonProps
 * @memberof ActionButton
 */
export type ActionButtonProps = {
  /** Action to which button should redirect */
  action: ActionJSON;
  /** Id of a resource of an action */
  resourceId: string;
  /** Optional recordId for _record_ action */
  recordId?: string;
  /** Optional recordIds for _bulk_ action */
  recordIds?: Array<string>;
  /** optional callback function which will be triggered when action is performed */
  actionPerformed?: (action: ActionResponse) => any;
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

/**
 * Renders Button which redirects to given action
 *
 * @component
 * @subcategory Application
 */
class ActionButton extends React.PureComponent<
  RouteComponentProps & AddNoticeProps & ActionButtonProps
> {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  href(): string {
    const {
      action, resourceId, recordId, recordIds, location,
    } = this.props
    const h = new ViewHelpers()
    const { name: actionName, actionType } = action

    switch (actionType) {
    case 'record':
      if (!recordId) {
        throw new Error('You have to specify "recordId" for record action')
      }
      return h.recordActionUrl({ resourceId, recordId, actionName, search: location.search })
    case 'resource':
      return h.resourceActionUrl({ resourceId, actionName, search: location.search })
    case 'bulk':
      return h.bulkActionUrl({ resourceId, recordIds, actionName, search: location.search })
    default:
      throw new Error('"actionType" should be either record, resource or bulk')
    }
  }

  callApi(): void {
    const {
      action, resourceId, recordId, location,
      history, actionPerformed, addNotice, recordIds,
    } = this.props

    const api = new ApiClient()
    let promise: Promise<AxiosResponse<ActionResponse>>

    switch (action.actionType) {
    case 'record':
      if (!recordId) {
        throw new Error('You have to specify "recordId" for record action')
      }
      promise = api.recordAction({
        resourceId, actionName: action.name, recordId,
      })
      break
    case 'resource':
      promise = api.resourceAction({
        resourceId, actionName: action.name,
      })
      break
    case 'bulk':
      if (!recordIds) {
        throw new Error('You have to specify "recordIds" for bulk action')
      }
      promise = api.bulkAction({
        resourceId, actionName: action.name, recordIds,
      })
      break
    default:
      throw new Error('"actionType" should be either record, resource or bulk')
    }

    promise.then((response) => {
      const { data } = response
      if (data.notice) {
        addNotice(data.notice)
      }
      if (data.redirectUrl && location.pathname !== data.redirectUrl) {
        history.push(appendForceRefresh(data.redirectUrl))
      }
      if (actionPerformed) {
        actionPerformed(data)
      }
    }).catch((error) => {
      throw error
    })
  }

  handleClick(event): void {
    const { action } = this.props

    if (action.guard && !confirm(action.guard)) {
      event.preventDefault()
      return
    }
    if (typeof action.component !== 'undefined' && action.component === false) {
      event.preventDefault()
      this.callApi()
    }
  }

  render(): ReactNode {
    const { children, action } = this.props

    if (!action) {
      return null
    }

    return (
      <StyledLink
        to={this.href()}
        onClick={this.handleClick}
      >
        {children}
      </StyledLink>
    )
  }
}

// TODO - remove this hack
export default withRouter(withNotice(ActionButton)) as unknown as ComponentClass<ActionButtonProps>
