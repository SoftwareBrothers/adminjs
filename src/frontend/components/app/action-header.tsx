/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import styled from 'styled-components'
import ActionButton from './action-button'

import ViewHelpers from '../../../backend/utils/view-helpers'
import { useTranslation } from '../../hooks/use-translation'

import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import ActionJSON from '../../../backend/decorators/action-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

import { Box, Badge, H3, H2, Button, Icon, ButtonCSS, ButtonProps, Link } from '../design-system'
import Breadcrumbs from './breadcrumbs'

/**
 * @memberof ActionHeader
 * @alias ActionHeaderProps
 */
export type ActionHeaderProps = {
  /** Resource for the action */
  resource: ResourceJSON;
  /** Optional record - for _record_ actions */
  record?: RecordJSON;
  /** If given, action header will render Filter button */
  toggleFilter?: () => any;

  actionPerformed?: () => any;
  /** An action objet */
  action: ActionJSON;
  /** Optional tag which will be rendered as a {@link Badge} */
  tag?: string;
  /** If set, component wont render actions */
  omitActions?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = styled(({ rounded, ...rest }) => <RouterLink {...rest} />)<ButtonProps>`${ButtonCSS}`

/**
 * Header of an action. It renders Action name with buttons for all the actions.
 *
 * @component
 * @subcategory Application
 */
const ActionHeader: React.FC<ActionHeaderProps> = (props) => {
  const { translateButton } = useTranslation()

  const h = new ViewHelpers()
  const {
    resource, toggleFilter, actionPerformed, record, action, tag, omitActions,
  } = props

  const resourceId = resource.id
  const actions = record
    ? record.recordActions.filter(ra => !action || action.name !== ra.name)
    // only new action should be seen in regular "Big" actions place
    : resource.resourceActions.filter(ra => ra.name === 'new' && (!action || action.name !== ra.name))

  // list and new actions are special and are are always
  const customResourceActions = resource.resourceActions.filter(ra => !['list', 'new'].includes(ra.name))

  const title = action ? action.label : resource.name
  const isList = action && action.name === 'list'

  // styled which differs if action header is in the drawer or not
  const cssIsRootFlex = !action.showInDrawer
  const cssHeaderMT = action.showInDrawer ? '' : 'lg'
  const cssCloseIcon = action.showInDrawer ? 'ChevronRight' : 'ChevronLeft'
  const cssActionButtonSize = action.showInDrawer ? 'sm' : 'lg'
  const cssActionsMB = action.showInDrawer ? 'xl' : 'default'
  const CssHComponent = action.showInDrawer ? H3 : H2

  return (
    <React.Fragment>
      {action.showInDrawer ? '' : (
        <Box flex flexDirection="row">
          <Breadcrumbs resource={resource} actionName={action.name} record={record} />
          <Box flexShrink={0}>
            {customResourceActions.map(customAction => (
              <ActionButton
                action={customAction}
                key={customAction.name}
                resourceId={resource.id}
              >
                <Link as="span" ml="lg">
                  <Icon icon={customAction.icon} />
                  {customAction.label}
                </Link>
              </ActionButton>
            ))}
          </Box>
        </Box>
      )}
      <Box flex={cssIsRootFlex}>
        <Box mt={cssHeaderMT} flexGrow={1}>
          <CssHComponent mb="lg">
            {!isList ? (
              <StyledLink
                size="icon"
                to={h.resourceUrl({ resourceId, search: window.location.search })}
                rounded
                mr="lg"
                type="button"
              >
                <Icon icon={cssCloseIcon} />
              </StyledLink>
            ) : ''}
            {title}
            {tag ? (<Badge variant="primary" ml="default">{tag}</Badge>) : ''}
          </CssHComponent>
        </Box>
        {omitActions ? '' : (
          <Box mt="xl" mb={cssActionsMB} flexShrink={0}>
            {actions.map(headerAction => (
              <ActionButton
                action={headerAction}
                key={headerAction.name}
                actionPerformed={actionPerformed}
                resourceId={resource.id}
                recordId={record && record.id}
              >
                <Button
                  as="span"
                  mr={action.showInDrawer ? 'default' : ''}
                  ml={!action.showInDrawer ? 'default' : ''}
                  mb="default"
                  variant={headerAction.name === 'new' ? 'primary' : undefined}
                  size={cssActionButtonSize}
                >
                  <Icon icon={headerAction.icon} />
                  {headerAction.label}
                </Button>
              </ActionButton>
            ))}
            {toggleFilter && (
              <Button onClick={toggleFilter} ml="default">
                <Icon icon="SettingsAdjust" />
                {translateButton('filter', resource.id)}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </React.Fragment>
  )
}

export default ActionHeader
