import React, { ReactNode } from 'react'

import WrapperBox from '../ui/wrapper-box'
import ErrorBoundary from './error-boundary'

import * as actions from '../actions'
import { DOCS } from '../../../constants'
import { ActionProps } from '../actions/action.props'

declare const AdminBro: {
  UserComponents: Array<string>;
}

// TODO: Remove the above hack to something more type safe

type State = {
  isClient: boolean;
}

/**
 * Component which renders all the default and custom actions for both the Resource and the Record.
 *
 * It passes all props down to the actual Action component.
 *
 * Example of creating your own actions:
 * ```
 * // AdminBro options
 * const AdminBroOptions = {
 *   resources: [
 *      resource,
 *      options: {
 *        actions: {
 *           myNewAction: {
 *             label: 'amazing action',
 *             icon: 'fas fa-eye',
 *             inVisible: (resource, record) => record.param('email') !== '',
 *             actionType: 'record',
 *             component: AdminBro.bundle('./my-new-action'),
 *             handler: (request, response, data) => {
 *               return {
 *                  ...
 *               }
 *             }
 *           }
 *        }
 *      }
 *   ]
 * }
 * ```
 *
 * ```
 * // ./my-new-action.jsx
 * import WrapperBox from 'admin-bro'
 *
 * const MyNewAction = (props) => {
 *   const { resource, action, record } = props
 *   // do something with the props and render action
 *   return (
 *     <WrapperBox>Some Action Content</WrapperBox>
 *   )
 * }
 * ```
 *
 * @component
 * @name BaseActionComponent
 * @category Base
 */
class BaseActionComponent extends React.Component<ActionProps, State> {
  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
    }
  }

  componentDidMount(): void {
    this.setState({ isClient: true })
  }

  render(): ReactNode {
    const { resource, action, record, setTag } = this.props

    const { isClient } = this.state
    const documentationLink = [DOCS, 'BaseAction.html'].join('/')

    let Action = actions[action.name]
    if (isClient && action.component) {
      Action = AdminBro.UserComponents[action.component]
    }
    if (Action) {
      return (
        <ErrorBoundary>
          <Action
            action={action}
            resource={resource}
            record={record}
            setTag={setTag}
          />
        </ErrorBoundary>
      )
    }
    return Action || (
      <WrapperBox border>
        <div className="notification">
          You have to implement action component for your Action.
          See:
          {' '}
          <a href={documentationLink}>the documentation</a>
        </div>
      </WrapperBox>
    )
  }
}

export default BaseActionComponent
