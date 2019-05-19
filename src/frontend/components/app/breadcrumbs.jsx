import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { resourceType, recordType } from '../../types'

const BreadcrumbsContainer = styled.nav.attrs({
  className: 'breadcrumb',
})`
  &&& {
    margin: ${({ theme }) => `-${theme.sizes.padding} 0 ${theme.sizes.padding} -10px`};
    font-size: ${({ theme }) => theme.fonts.base};
  }
`

const BreadcrumbLink = styled(Link)`
  &&& {
    color: ${({ theme }) => theme.colors.lightText};
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

/**
 * @private
 * @component
 * var recordAction = {
 *   actionType: 'record',
 *   icon: 'fas fa-edit',
 *   isVisible: true,
 *   label: 'Action',
 *   name: 'action'
 * };
 * props = {
 *   resource: {
 *     href: '/admin/xxxx',
 *     name: 'resource name',
 *     recordActions: [recordAction],
 *     resourceActions: [],
 *   },
 *   record: {
 *     id: 'some-record',
 *     name: 'some-name',
 *     params: {},
 *   },
 *   actionName: recordAction.name,
 * }
 */
class Breadcrumbs extends React.PureComponent {
  renderResource() {
    const { resource, record } = this.props
    return (
      <li>
        <BreadcrumbLink to={resource.href} className={record && 'is-active'}>
          {resource.name}
        </BreadcrumbLink>
      </li>
    )
  }

  renderAction() {
    const { actionName, resource } = this.props
    const action = resource.resourceActions.find(a => a.name === actionName)
      || resource.recordActions.find(a => a.name === actionName)
    if (actionName) {
      return (
        <li className="is-active">
          <BreadcrumbLink href="#">{action.label}</BreadcrumbLink>
        </li>
      )
    }
    return null
  }

  render() {
    return (
      <BreadcrumbsContainer>
        <ul>
          {this.renderResource()}
          {this.renderAction()}
        </ul>
      </BreadcrumbsContainer>
    )
  }
}

Breadcrumbs.propTypes = {
  resource: resourceType.isRequired,
  record: recordType,
  actionName: PropTypes.string,
}

Breadcrumbs.defaultProps = {
  record: null,
  actionName: null,
}

export default Breadcrumbs
