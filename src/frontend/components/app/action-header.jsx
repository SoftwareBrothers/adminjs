import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ActionButton from './action-button'
import StyledButton from '../ui/styled-button'

import ViewHelpers from '../../../backend/utils/view-helpers'

import { resourceType, actionType } from '../../types'

const HeaderWrapper = styled.section.attrs({
  className: 'level',
})`
  &&& {
    margin-bottom: ${({ theme }) => theme.sizes.padding};
  }
`

const Tag = styled.span.attrs({
  className: 'tag',
})`
  &&& {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    margin-left: ${({ theme }) => theme.sizes.padding};
  }
`

const BackBtn = styled(Link)`
  &&& {
    border-radius: 50%;
    width: ${({ theme }) => theme.sizes.paddingLayout};
    height: ${({ theme }) => theme.sizes.paddingLayout};
    color: ${({ theme }) => theme.colors.lightText};
    font-size: ${({ theme }) => theme.fonts.base};
    padding: ${({ theme }) => theme.sizes.paddingMin};
    background-color: ${({ theme }) => theme.colors.superLightBack};
    text-align: center;
    margin-right: ${({ theme }) => theme.sizes.padding};
    &:hover{
      background-color: ${({ theme }) => theme.colors.lightText};
      color: #fff;
    }
  }
`

const HeaderTitle = styled.h1.attrs({
  className: 'level-left',
})`
  &&& {
    font-size: ${({ theme }) => theme.fonts.header};
    font-weight: normal;
  }
`

const HeaderButtons = styled.div.attrs({
  className: 'level-right',
})`
  &&& a {
    margin-left: ${({ theme }) => theme.sizes.padding};
  }
`

/**
 * Header of an action
 *
 * @private
 * @component
 * var recordAction = {
 *     actionType: 'record',
 *     icon: 'fas fa-edit',
 *     isVisible: true,
 *     label: 'Action',
 *     name: 'action'
 * };
 *
 */
const ActionHeader = (props) => {
  const h = new ViewHelpers()
  const {
    resource, toggleFilter, actionPerformed, recordId, action, tag,
  } = props
  const resourceId = resource.id
  let actions = recordId ? resource.recordActions : resource.resourceActions

  // list action is not accessible via the ActionHeader buttons
  actions = actions.filter(ra => ![action.name, 'list'].includes(ra.name))

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

ActionHeader.propTypes = {
  resource: resourceType.isRequired,
  toggleFilter: PropTypes.func,
  actionPerformed: PropTypes.func,
  recordId: PropTypes.string,
  action: actionType,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

ActionHeader.defaultProps = {
  toggleFilter: null,
  actionPerformed: null,
  recordId: null,
  action: null,
  tag: null,
}

export default ActionHeader
