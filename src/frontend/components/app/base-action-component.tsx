import React from 'react'
import { Trans } from 'react-i18next'
import { MessageBox, Link } from '@adminjs/design-system'

import ErrorBoundary from './error-boundary.js'
import { actions } from '../actions/index.js'
import { DOCS } from '../../../constants.js'
import { ActionProps } from '../actions/action.props.js'
import { useTranslation } from '../../hooks/index.js'

declare const AdminJS: {
  UserComponents: Array<string>;
}

/**
 * Component which renders all the default and custom actions for both the Resource and the Record.
 *
 * It passes all props down to the actual Action component.
 *
 * Example of creating your own actions:
 * ```
 * // AdminJS options
 * const AdminJSOptions = {
 *   resources: [
 *      resource,
 *      options: {
 *        actions: {
 *           myNewAction: {
 *             label: 'amazing action',
 *             icon: 'Add',
 *             inVisible: (resource, record) => record.param('email') !== '',
 *             actionType: 'record',
 *             component: 'MyNewAction',
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
 * // ./my-new-action.js
 * import { Box } from 'adminjs'
 *
 * const MyNewAction = (props) => {
 *   const { resource, action, record } = props
 *   // do something with the props and render action
 *   return (
 *     <Box>Some Action Content</Box>
 *   )
 * }
 * ```
 *
 * @component
 * @name BaseActionComponent
 * @subcategory Application
 */
export const BaseActionComponent: React.FC<ActionProps> = (props) => {
  const { resource, action, record, records, setTag } = props
  const documentationLink = [DOCS, 'BaseAction.html'].join('/')

  const { translateMessage } = useTranslation()

  let Action = actions[action.name]

  if (action.component) {
    Action = AdminJS.UserComponents[action.component]
  }

  if (Action) {
    return (
      <ErrorBoundary>
        <Action
          action={action}
          resource={resource}
          record={record}
          records={records}
          setTag={setTag}
        />
      </ErrorBoundary>
    )
  }
  return Action || (
    <MessageBox variant="danger">
      {translateMessage('noActionComponent')}
      <Trans key="messages.buttons.seeTheDocumentation">
        See:
        <Link ml="default" href={documentationLink}>the documentation</Link>
      </Trans>
    </MessageBox>
  )
}

export default BaseActionComponent
