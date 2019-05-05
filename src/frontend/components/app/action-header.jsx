import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ActionButton from './action-button'
import StyledButton from '../ui/styled-button'

import ViewHelpers from '../../../backend/utils/view-helpers'

import { sizes, fonts, colors } from '../../styles/variables'
import { resourceType, actionType } from '../../types'

const HeaderWrapper = styled.section.attrs({
  className: 'level',
})`
  &&& {
    margin-bottom: ${sizes.padding};
  }
`

const Tag = styled.span.attrs({
  className: 'tag',
})`
  &&& {
    background: ${colors.primary};
    color: #fff;
    margin-left: ${sizes.padding};
  }
`

const BackBtn = styled(Link)`
  &&& {
    border-radius: 50%;
    width: ${sizes.paddingLayout};
    height: ${sizes.paddingLayout};
    color: ${colors.lightText};
    font-size: ${fonts.base};
    padding: ${sizes.paddingMin};
    background-color: ${colors.superLightBack};
    text-align: center;
    margin-right: ${sizes.padding};
    &:hover{
      background-color: ${colors.lightText};
      color: #fff;
    }
  }
`

const HeaderTitle = styled.h1.attrs({
  className: 'level-left',
})`
  &&& {
    font-size: ${fonts.header};
    font-weight: normal;
  }
`

const HeaderButtons = styled.div.attrs({
  className: 'level-right',
})`
  ${StyledButton} {
    margin-left: ${sizes.padding};
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
 * props = {
 *   resource: {
 *     editProperties: [],
 *     id: "ResourceId",
 *     name: "Resource Name",
 *     resourceActions: [recordAction],
 *     recordActions: [recordAction],
 *   }
 * }
 */
const ActionHeader = (props) => {
  const h = new ViewHelpers()
  const {
    resource, toggleFilter, actionPerformed, recordId, action, tag,
  } = props
  const resourceId = resource.id
  const actions = recordId
    ? resource.recordActions.filter(ra => ra.name !== action.name)
    : resource.resourceActions.filter(ra => ra.name !== (action && action.name))
  const title = recordId ? action.label : resource.name

  return (
    <HeaderWrapper>
      <HeaderTitle>
        {!toggleFilter && (
          <BackBtn to={h.listUrl({ resourceId })}>
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
          <StyledButton onClick={toggleFilter} as="button">
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
