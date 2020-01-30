import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import ActionButton from './action-button'

import ViewHelpers from '../../../backend/utils/view-helpers'

import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import ActionJSON from '../../../backend/decorators/action-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

import { Box, Badge, H3, Button, Icon, ButtonCSS } from '../design-system'

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

const StyledLink = styled(Link)`${ButtonCSS}`

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

  return (
    <Box>
      <H3>
        {!isList ? (
          <StyledLink
            size="icon"
            to={h.resourceUrl({ resourceId, search: window.location.search })}
            rounded
            mr="lg"
            type="button"
          >
            <Icon icon="ChevronRight" />
          </StyledLink>
        ) : ''}
        {title}
        {tag ? (<Badge variant="primary" ml="default">{tag}</Badge>) : ''}
      </H3>
      {omitActions ? '' : (
        <Box my="xl">
          {actions.map(headerAction => (
            <ActionButton
              action={headerAction}
              key={headerAction.name}
              actionPerformed={actionPerformed}
              resourceId={resource.id}
              recordId={record && record.id}
            >
              <Button as="span" mr="default" variant="primary">
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
