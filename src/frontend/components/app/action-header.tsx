/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import styled from 'styled-components'
import {
  Box,
  Badge,
  H3,
  H2,
  Button,
  Icon,
  ButtonCSS,
  ButtonProps,
  Link,
  cssClass,
} from '@admin-bro/design-system'

import ActionButton from './action-button'
import Breadcrumbs from './breadcrumbs'

import ViewHelpers from '../../../backend/utils/view-helpers'
import { useTranslation } from '../../hooks/use-translation'

import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import ActionJSON from '../../../backend/decorators/action-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { ActionResponse } from '../../../backend/actions/action.interface'


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
  /**
   * It indicates if action without a component was performed.
   */
  actionPerformed?: (action: ActionResponse) => any;
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
 * ### Usage
 *
 * ```
 * import { ActionHeader } from 'admin-bro'
 * ```
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

  if (action.hideActionHeader) {
    return null
  }

  const resourceId = resource.id
  const actions = record
    ? record.recordActions.filter(ra => !action || action.name !== ra.name)
    // only new action should be seen in regular "Big" actions place
    : resource.resourceActions.filter(ra => ra.name === 'new' && (!action || action.name !== ra.name))

  // list and new actions are special and are are always
  const customResourceActions = resource.resourceActions.filter(ra => !['list', 'new'].includes(ra.name))

  const title = action ? action.label : resource.name
  const isList = action && action.name === 'list'
  const listAction = resource.resourceActions.find(ra => ra.name === 'list')

  // styled which differs if action header is in the drawer or not
  const cssIsRootFlex = !action.showInDrawer
  const cssHeaderMT = action.showInDrawer ? '' : 'lg'
  const cssCloseIcon = action.showInDrawer ? 'ChevronRight' : 'ChevronLeft'
  const cssActionButtonSize = action.showInDrawer ? 'sm' : 'lg'
  const cssActionsMB = action.showInDrawer ? 'xl' : 'default'
  const CssHComponent = action.showInDrawer ? H3 : H2

  return (
    <Box className={cssClass('ActionHeader')}>
      {action.showInDrawer ? '' : (
        <Box flex flexDirection="row" px={['default', 0]}>
          <Breadcrumbs resource={resource} actionName={action.name} record={record} />
          <Box flexShrink={0}>
            {customResourceActions.map(customAction => (
              <ActionButton
                action={customAction}
                key={customAction.name}
                resourceId={resource.id}
              >
                <Link as="span" ml="lg">
                  {customAction.icon ? <Icon icon={customAction.icon} /> : null}
                  {customAction.label}
                </Link>
              </ActionButton>
            ))}
          </Box>
        </Box>
      )}
      <Box display={['block', cssIsRootFlex ? 'flex' : 'block']}>
        <Box mt={cssHeaderMT} flexGrow={1} px={['default', 0]}>
          <CssHComponent mb="lg">
            {!isList && listAction ? (
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
                  {headerAction.icon ? <Icon icon={headerAction.icon} /> : null}
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
    </Box>
  )
}

export default ActionHeader
