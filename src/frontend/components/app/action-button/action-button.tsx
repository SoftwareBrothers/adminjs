import React, { ReactElement } from 'react'
import { stringify } from 'qs'

import { ActionResponse } from '../../../../backend/actions/action.interface.js'
import allowOverride from '../../../hoc/allow-override.js'
import { useAction } from '../../../hooks/index.js'
import { ActionJSON, buildActionTestId } from '../../../interfaces/index.js'
import { getActionElementCss } from '../../../utils/index.js'

/**
 * @alias ActionButtonProps
 * @memberof ActionButton
 */
export type ActionButtonProps = {
  /** Action to which button should redirect */
  action: ActionJSON
  /** Id of a resource of an action */
  resourceId: string
  /** Optional recordId for _record_ action */
  recordId?: string
  /** Optional recordIds for _bulk_ action */
  recordIds?: Array<string>
  /** optional callback function which will be triggered when action is performed */
  actionPerformed?: (action: ActionResponse) => any
  children?: React.ReactNode
  search?: string
  queryParams?: Record<string, unknown>
}

/**
 * Renders Button which redirects to given action
 *
 * ### Usage
 *
 * ```
 * import { ActionButton } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
 */
const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const {
    children,
    action,
    actionPerformed,
    resourceId,
    recordId,
    recordIds,
    search,
    queryParams,
  } = props

  const { href, handleClick } = useAction(
    action,
    {
      resourceId,
      recordId,
      recordIds,
      search: stringify(queryParams, { addQueryPrefix: true }) || search,
    },
    actionPerformed,
  )

  if (!action) {
    return null
  }

  const firstChild = React.Children.toArray(children)[0]

  if (
    !firstChild
    || typeof firstChild === 'string'
    || typeof firstChild === 'number'
    || typeof firstChild === 'boolean'
  ) {
    throw new Error('ActionButton has to have one child')
  }

  const contentTag = getActionElementCss(resourceId, action.name, 'button')

  const WrappedElement = React.cloneElement(firstChild as ReactElement<any>, {
    onClick: handleClick,
    'data-testid': buildActionTestId(action),
    'data-css': contentTag,
    href,
  })

  return WrappedElement
}

const OverridableActionButton = allowOverride(ActionButton, 'ActionButton')

export {
  OverridableActionButton as default,
  OverridableActionButton as ActionButton,
  ActionButton as OriginalActionButton,
}
