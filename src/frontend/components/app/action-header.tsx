import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ActionButton from './action-button'
import StyledButton from '../ui/styled-button'

import ViewHelpers from '../../../backend/utils/view-helpers'

import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import ActionJSON from '../../../backend/decorators/action-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

import { Badge, H1, Drawer, Button, Icon } from '../design-system'

const HeaderWrapper = styled.section`
  margin-bottom: ${({ theme }): string => theme.sizes.padding};
  display: flex;

  & ${H1} {
    flex-grow: 1;
  }

  ${Drawer} & {
    display: block;
  }
`

const BackBtn = styled(Link)`
  &&& {
    border-radius: 50%;
    width: ${({ theme }): string => theme.sizes.paddingLayout};
    height: ${({ theme }): string => theme.sizes.paddingLayout};
    color: ${({ theme }): string => theme.colors.lightText};
    font-size: ${({ theme }): string => theme.font};
    padding: ${({ theme }): string => theme.sizes.paddingMin};
    background-color: ${({ theme }): string => theme.colors.superLightBack};
    text-align: center;
    margin-right: ${({ theme }): string => theme.sizes.padding};
    &:hover{
      background-color: ${({ theme }): string => theme.colors.lightText};
      color: #fff;
    }
  }
`

const HeaderButtons = styled.div`
  ${Drawer} & a {
    margin-left: 0;
    margin-right: ${({ theme }): string => theme.sizes.padding};
  }
  ${Drawer} & {
    margin: ${({ theme }): string => theme.sizes.paddingLayout} 0;
    padding-bottom: ${({ theme }): string => theme.sizes.paddingLayout};
    border-bottom: 1px solid ${({ theme }): string => theme.colors.border};
  }
`

/**
 * @memberof ActionHeader
 * @private
 */
interface Props {
  resource: ResourceJSON;
  record?: RecordJSON;
  toggleFilter?: () => any;
  actionPerformed?: () => any;
  recordId?: string;
  action?: ActionJSON;
  tag?: string;
}

/**
 * Header of an action
 *
 * @private
 * @component
 */
const ActionHeader: React.FC<Props> = (props) => {
  const h = new ViewHelpers()
  const {
    resource, toggleFilter, actionPerformed, record, action, tag, recordId,
  } = props
  const resourceId = resource.id
  let actions = record ? record.recordActions : resource.resourceActions

  // list action is not accessible via the ActionHeader buttons
  actions = actions && actions.filter(ra => ![action && action.name, 'list'].includes(ra.name))

  const title = action ? action.label : resource.name
  const isList = action && action.name === 'list'

  return (
    <HeaderWrapper>
      <H1>
        {!isList && (
          <BackBtn
            to={h.resourceUrl({ resourceId, search: window.location.search })}
          >
            <i className="icomoon-pagination-left" />
          </BackBtn>
        )}
        {title}
        {tag ? (<Badge variant="primary" ml={3}>{tag}</Badge>) : ''}
      </H1>
      <HeaderButtons>
        {actions.map(headerAction => (
          <ActionButton
            action={headerAction}
            key={headerAction.name}
            actionPerformed={actionPerformed}
            resourceId={resource.id}
            recordId={recordId}
          >
            <Button as="span" mr={3} variant="primary">
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
      </HeaderButtons>
    </HeaderWrapper>
  )
}

export default ActionHeader
