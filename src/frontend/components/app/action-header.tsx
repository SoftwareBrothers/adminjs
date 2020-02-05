import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import ActionButton from './action-button'

import ViewHelpers from '../../../backend/utils/view-helpers'

import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import ActionJSON from '../../../backend/decorators/action-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

import { Box, Badge, H3, H2, Button, Icon, ButtonCSS, ButtonProps } from '../design-system'

/**
 * @memberof ActionHeader
 * @private
 */
interface Props {
  resource: ResourceJSON;
  record?: RecordJSON;
  toggleFilter?: () => any;
  actionPerformed?: () => any;
  action: ActionJSON;
  tag?: string;
  omitActions?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = styled(({ rounded, ...rest }) => <Link {...rest} />)<ButtonProps>`${ButtonCSS}`

/**
 * Header of an action
 *
 * @private
 * @component
 */
const ActionHeader: React.FC<Props> = (props) => {
  const h = new ViewHelpers()
  const {
    resource, toggleFilter, actionPerformed, record, action, tag, omitActions,
  } = props
  const resourceId = resource.id
  let actions = record ? record.recordActions : resource.resourceActions

  // list action is not accessible via the ActionHeader buttons
  actions = actions && actions.filter(ra => ![action && action.name, 'list'].includes(ra.name))

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
                size={cssActionButtonSize}
              >
                <Icon icon={headerAction.icon} />
                {headerAction.label}
              </Button>
            </ActionButton>
          ))}
          {toggleFilter && (
            <Button onClick={toggleFilter}>
              <Icon icon="SettingsAdjust" />
              Filter
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}

export default ActionHeader
