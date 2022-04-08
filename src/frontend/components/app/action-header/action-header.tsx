/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Box, Badge, H3, H2, ButtonGroup, cssClass } from '@adminjs/design-system'
import { useHistory } from 'react-router'

import Breadcrumbs from '../breadcrumbs'
import { ActionHeaderProps } from './action-header-props'
import { actionsToButtonGroup } from './actions-to-button-group'
import { StyledBackButton } from './styled-back-button'

import { useActionResponseHandler, useTranslation } from '../../../hooks'
import { ActionJSON, buildActionClickHandler } from '../../../interfaces/action'

/**
 * Header of an action. It renders Action name with buttons for all the actions.
 *
 * ### Usage
 *
 * ```
 * import { ActionHeader } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
 */
export const ActionHeader: React.FC<ActionHeaderProps> = (props) => {
  const {
    resource, toggleFilter, actionPerformed, record, action, tag, omitActions,
  } = props

  const { translateButton } = useTranslation()
  const history = useHistory()
  const actionResponseHandler = useActionResponseHandler(actionPerformed)

  if (action.hideActionHeader) {
    return null
  }

  const resourceId = resource.id
  const params = { resourceId, recordId: record?.id }

  const handleActionClick = (event, sourceAction: ActionJSON): any | Promise<any> => (
    buildActionClickHandler({
      action: sourceAction,
      params,
      actionResponseHandler,
      push: history.push,
    })(event)
  )

  const actionButtons = actionsToButtonGroup({
    actions: record
      ? record.recordActions.filter(ra => !action || action.name !== ra.name)
      // only new action should be seen in regular "Big" actions place
      : resource.resourceActions.filter(ra => ra.name === 'new' && (!action || action.name !== ra.name)),
    params,
    handleClick: handleActionClick,
  })

  if (toggleFilter) {
    actionButtons.push({
      label: translateButton('filter', resource.id),
      onClick: toggleFilter,
      icon: 'SettingsAdjust',
    })
  }

  // list and new actions are special and are are always
  const customResourceButtons = actionsToButtonGroup({
    actions: action.showResourceActions
      ? resource.resourceActions.filter(ra => !['list', 'new'].includes(ra.name))
      : [],
    params: { resourceId },
    handleClick: handleActionClick,
  })

  const title = action ? action.label : resource.name
  const isList = action && action.name === 'list'
  const listAction = resource.resourceActions.find(ra => ra.name === 'list')

  // styled which differs if action header is in the drawer or not
  const cssIsRootFlex = !action.showInDrawer
  const cssHeaderMT = action.showInDrawer ? '' : 'lg'
  const cssActionsMB = action.showInDrawer ? 'xl' : 'default'
  const CssHComponent = action.showInDrawer ? H3 : H2

  return (
    <Box className={cssClass('ActionHeader')}>
      {action.showInDrawer ? '' : (
        <Box flex flexDirection="row" px={['default', 0]}>
          <Breadcrumbs resource={resource} actionName={action.name} record={record} />
          <Box flexShrink={0}>
            <ButtonGroup size="sm" rounded buttons={customResourceButtons} />
          </Box>
        </Box>
      )}
      <Box display={['block', cssIsRootFlex ? 'flex' : 'block']}>
        <Box mt={cssHeaderMT} flexGrow={1} px={['default', 0]}>
          <CssHComponent mb="lg">
            {!isList && listAction ? (
              <StyledBackButton resourceId={resourceId} showInDrawer={action.showInDrawer} />
            ) : ''}
            {title}
            {tag ? (<Badge variant="primary" ml="default">{tag}</Badge>) : ''}
          </CssHComponent>
        </Box>
        {omitActions ? '' : (
          <Box mt="xl" mb={cssActionsMB} flexShrink={0}>
            <ButtonGroup buttons={actionButtons} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ActionHeader
