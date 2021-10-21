/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Box, H3, ButtonGroup, cssClass, ButtonInGroup } from '@adminjs/design-system'
import { useHistory } from 'react-router'

import styled from 'styled-components'
import Breadcrumbs from '../breadcrumbs'
import { ActionHeaderProps } from './action-header-props'
import { actionsToButtonGroup } from './actions-to-button-group'
import { StyledBackButton } from './styled-back-button'

import { useActionResponseHandler, useTranslation } from '../../../hooks'
import { ActionJSON, buildActionClickHandler } from '../../../interfaces/action'
import { StyledH2 } from '../../../customize/StyledH2'
import { StyledBadge } from '../../../customize/StyledBadge'
import { StyledContainer } from '../../../customize/StyledContainer'

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

  const handleActionClick = (event, sourceAction: ActionJSON): void => (
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
    actionButtons.unshift({
      label: translateButton('filter', resource.id),
      onClick: toggleFilter,
      icon: 'SettingsAdjust',
      className: 'btn filter_btn',
    })
  }

  // list and new actions are special and are are always
  const customResourceButtons = actionsToButtonGroup({
    actions: resource.resourceActions.filter(ra => !['list', 'new'].includes(ra.name)),
    params: { resourceId },
    handleClick: handleActionClick,
  })

  const title = action ? action.label : resource.name
  const isList = action && action.name === 'list'
  const listAction = resource.resourceActions.find(ra => ra.name === 'list')

  // styled which differs if action header is in the drawer or not
  const cssIsRootFlex = !action.showInDrawer
  const CssHComponent = action.showInDrawer ? H3 : StyledH2

  const StyledTitleWithBreadcrumb = styled.div<{withBreadcrumbs: boolean}>`
  display: flex;
  flex-direction: ${styledProps => (styledProps.withBreadcrumbs ? 'column' : 'row')};
  flex-wrap: nowrap;
  ${styledProps => (styledProps.withBreadcrumbs ? '' : 'align-items: center;')};
`

  return (
    <StyledContainer
      withBorder
      withTopBottomPadding
    >
      <Box className={cssClass('ActionHeader')}>
        {action.showInDrawer ? '' : (
          <Box flex flexDirection="row" px={['default', 0]}>
            <Box flexShrink={0}>
              <ButtonGroup size="sm" rounded buttons={customResourceButtons} />
            </Box>
          </Box>
        )}
        <Box
          display={['block', cssIsRootFlex ? 'flex' : 'block']}
          style={{
            alignItems: 'center',
          }}
        >
          <Box flexGrow={1} px={['default', 0]}>
            <CssHComponent>
              {!isList && listAction ? (
                <StyledBackButton resourceId={resourceId} showInDrawer={action.showInDrawer} />
              ) : ''}
              <StyledTitleWithBreadcrumb withBreadcrumbs={!isList}>
                {!isList && (
                  <Breadcrumbs resource={resource} actionName={action.name} record={record} />
                )}
                {title}
                {tag ? (<StyledBadge>{tag}</StyledBadge>) : ''}
              </StyledTitleWithBreadcrumb>
            </CssHComponent>
          </Box>
          {omitActions ? '' : (
            <Box flexShrink={0} flex style={{ gap: '16px' }}>
              {actionButtons.map((button, i) => (
                <ButtonInGroup
                  key={`${button.label || ''}-${i}`}
                  {...button}
                  className={button.className}
                />
              )) }
            </Box>
          )}
        </Box>
      </Box>
    </StyledContainer>
  )
}

export default ActionHeader
