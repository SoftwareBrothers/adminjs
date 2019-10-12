import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ActionButton from './action-button'
import StyledButton from '../ui/styled-button'

import ViewHelpers from '../../../backend/utils/view-helpers'

import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import ActionJSON from '../../../backend/decorators/action-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

const HeaderWrapper = styled.section.attrs({
  className: 'level',
})`
  &&& {
    margin-bottom: ${({ theme }): string => theme.sizes.padding};
  }
`

const Tag = styled.span.attrs({
  className: 'tag',
})`
  &&& {
    background: ${({ theme }): string => theme.colors.primary};
    color: #fff;
    margin-left: ${({ theme }): string => theme.sizes.padding};
  }
`

const BackBtn = styled(Link)`
  &&& {
    border-radius: 50%;
    width: ${({ theme }): string => theme.sizes.paddingLayout};
    height: ${({ theme }): string => theme.sizes.paddingLayout};
    color: ${({ theme }): string => theme.colors.lightText};
    font-size: ${({ theme }): string => theme.fonts.base};
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

const HeaderTitle = styled.h1.attrs({
  className: 'level-left',
})`
  &&& {
    font-size: ${({ theme }): string => theme.fonts.header};
    font-weight: normal;
  }
`

const HeaderButtons = styled.div.attrs({
  className: 'level-right',
})`
  &&& a {
    margin-left: ${({ theme }): string => theme.sizes.padding};
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
      <HeaderTitle>
        {!isList && (
          <BackBtn to={h.resourceActionUrl({ resourceId, actionName: 'list' })}>
            <i className="icomoon-pagination-left" />
          </BackBtn>
        )}
        {title}
        {tag ? (<Tag>{tag}</Tag>) : ''}
      </HeaderTitle>
      <HeaderButtons>
        {actions.map(headerAction => (
          <ActionButton
            action={headerAction}
            key={headerAction.name}
            actionPerformed={actionPerformed}
            className="is-primary"
            resourceId={resource.id}
            recordId={recordId}
          />
        ))}
        {toggleFilter && (
          <StyledButton onClick={toggleFilter} as="a">
            <span className="icon">
              <i className="fas fa-sliders-h" />
            </span>
            <span className="btn-text">Filter</span>
          </StyledButton>
        )}
      </HeaderButtons>
    </HeaderWrapper>
  )
}

export default ActionHeader
