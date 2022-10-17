/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Box, ButtonGroup, cssClass, H2, H3 } from '@adminjs/design-system'
import React from 'react'
import { useNavigate } from 'react-router'
import allowOverride from '../../../hoc/allow-override'
import { useActionResponseHandler, useTranslation } from '../../../hooks'
import { ActionJSON, buildActionClickHandler } from '../../../interfaces/action'
import { getActionElementCss, getResourceElementCss } from '../../../utils'
import Breadcrumbs from '../breadcrumbs'
import { ActionHeaderProps } from './action-header-props'
import { actionsToButtonGroup } from './actions-to-button-group'
import { StyledBackButton } from './styled-back-button'

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
const ActionHeader: React.FC<ActionHeaderProps> = (props) => {
  const {
    resource, toggleFilter, actionPerformed, record, action, tag, omitActions,
  } = props

  const { translateButton } = useTranslation()
  const navigate = useNavigate()
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
      navigate,
    })(event)
  )

  const actionButtons = actionsToButtonGroup({
    actions: record
      ? record.recordActions.filter((ra) => !action || action.name !== ra.name)
      // only new action should be seen in regular "Big" actions place
      : resource.resourceActions.filter((ra) => ra.name === 'new' && (!action || action.name !== ra.name)),
    params,
    handleClick: handleActionClick,
  })

  if (toggleFilter) {
    actionButtons.push({
      label: translateButton('filter', resource.id),
      onClick: toggleFilter,
      icon: 'SettingsAdjust',
      'data-css': getResourceElementCss(resource.id, 'filter-button'),
    })
  }

  // list and new actions are special and are are always
  const customResourceButtons = actionsToButtonGroup({
    actions: action.showResourceActions
      ? resource.resourceActions.filter((ra) => !['list', 'new'].includes(ra.name))
      : [],
    params: { resourceId },
    handleClick: handleActionClick,
  })

  const title = action ? action.label : resource.name
  const isList = action && action.name === 'list'
  const listAction = resource.resourceActions.find((ra) => ra.name === 'list')

  // styled which differs if action header is in the drawer or not
  const cssIsRootFlex = !action.showInDrawer
  const cssHeaderMT = action.showInDrawer ? '' : 'lg'
  const cssActionsMB = action.showInDrawer ? 'xl' : 'default'
  const CssHComponent = action.showInDrawer ? H3 : H2
  const contentTag = getActionElementCss(resourceId, action.name, 'action-header')
  return (
    <Box className={cssClass('ActionHeader')} data-css={contentTag}>
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

const OverridableActionHeader = allowOverride(ActionHeader, 'ActionHeader')

export {
  OverridableActionHeader as default,
  OverridableActionHeader as ActionHeader,
}
