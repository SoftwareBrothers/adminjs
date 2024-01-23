/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Box, ButtonGroup, cssClass, H2, H3 } from '@adminjs/design-system'
import React from 'react'
import { useNavigate, useLocation } from 'react-router'

import allowOverride from '../../../hoc/allow-override.js'
import { useActionResponseHandler, useTranslation, useModal } from '../../../hooks/index.js'
import { ActionJSON, buildActionClickHandler } from '../../../interfaces/action/index.js'
import { getActionElementCss, getResourceElementCss } from '../../../utils/index.js'
import Breadcrumbs from '../breadcrumbs.js'
import { ActionHeaderProps } from './action-header-props.js'
import { actionsToButtonGroup } from './actions-to-button-group.js'
import { StyledBackButton } from './styled-back-button.js'
import { useFilterDrawer } from '../../../hooks/use-filter-drawer.js'

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
    resource,
    actionPerformed,
    record,
    action,
    tag,
    omitActions,
    toggleFilter: isFilterButtonVisible,
  } = props
  const translateFunctions = useTranslation()
  const { translateButton, translateAction } = translateFunctions
  const navigate = useNavigate()
  const location = useLocation()
  const actionResponseHandler = useActionResponseHandler(actionPerformed)
  const modalFunctions = useModal()
  const { toggleFilter, filtersCount } = useFilterDrawer()

  if (action.hideActionHeader) {
    return null
  }

  const resourceId = resource.id
  const params = { resourceId, recordId: record?.id }
  // eslint-disable-next-line max-len
  const handleActionClick = (event, sourceAction: ActionJSON): any | Promise<any> => buildActionClickHandler({
    action: sourceAction,
    params,
    actionResponseHandler,
    navigate,
    location,
    translateFunctions,
    modalFunctions,
  })(event)

  const actionButtons = actionsToButtonGroup({
    actions: record
      ? record.recordActions.filter((ra) => !action || action.name !== ra.name)
      // only new action should be seen in regular "Big" actions place
      : resource.resourceActions.filter(
        (ra) => ra.name === 'new' && (!action || action.name !== ra.name),
      ),
    params,
    handleClick: handleActionClick,
    translateFunctions,
    modalFunctions,
  })

  if (typeof isFilterButtonVisible === 'function' || isFilterButtonVisible) {
    const filterTranslationKey = filtersCount > 0 ? 'filterActive' : 'filter'

    actionButtons.push({
      label: translateButton(filterTranslationKey, resource.id, { count: filtersCount }),
      onClick: toggleFilter,
      icon: 'Filter',
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
    translateFunctions,
    modalFunctions,
  })

  const title = action ? translateAction(action.label, resourceId) : resource.name

  // styled which differs if action header is in the drawer or not
  const cssIsRootFlex = !action.showInDrawer
  const cssHeaderMT = action.showInDrawer ? '' : 'lg'
  const cssActionsMB = action.showInDrawer ? 'xl' : 'default'
  const CssHComponent = action.showInDrawer ? H3 : H2
  const contentTag = getActionElementCss(resourceId, action.name, 'action-header')

  return (
    <Box className={cssClass('ActionHeader')} data-css={contentTag}>
      {!action.showInDrawer && (
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
            {action.showInDrawer && <StyledBackButton showInDrawer={action.showInDrawer} /> }
            {title}
            {tag ? (
              <Badge variant="default" outline ml="default">
                {tag}
              </Badge>
            ) : null}
          </CssHComponent>
        </Box>
        {!omitActions && (
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
  ActionHeader as OriginalActionHeader,
}
