import React, { ReactChild } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

const BreadcrumbsContainer = styled.nav.attrs({
  className: 'breadcrumb',
})`
  &&& {
    margin: ${({ theme }): string => `-${theme.sizes.padding} 0 ${theme.sizes.padding} -10px`};
    font-size: ${({ theme }): string => theme.fonts.base};
  }
`

const BreadcrumbLink = styled(Link)`
  &&& {
    color: ${({ theme }): string => theme.colors.lightText};
    &:hover {
      color: ${({ theme }): string => theme.colors.primary};
    }
  }
`

/**
 * Props
 */
interface Props {
  /**
   * Resource
   */
  resource: ResourceJSON;
  /**
   * record
   */
  record: RecordJSON | null;
  /**
   * Name of an action
   */
  actionName: string;
}

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
 *     resourceActions: [],
 *   },
 *   record: {
 *     id: 'some-record',
 *     name: 'some-name',
 *     recordActions: [recordAction],
 *     params: {},
 *   },
 *   actionName: recordAction.name,
 * }
 */
class Breadcrumbs extends React.PureComponent<Props> {
  renderResource(): React.ReactChild {
    const { resource, record } = this.props
    return (
      <li>
        <BreadcrumbLink to={resource.href} className={record && 'is-active'}>
          {resource.name}
        </BreadcrumbLink>
      </li>
    )
  }

  renderAction(): ReactChild {
    const { actionName, resource, record } = this.props
    const action = resource.resourceActions.find(a => a.name === actionName)
      || (record && record.recordActions.find(a => a.name === actionName))
    if (action) {
      return (
        <li className="is-active">
          <BreadcrumbLink href="#">{action.label}</BreadcrumbLink>
        </li>
      )
    }
    return null
  }

  render(): ReactChild {
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

export default Breadcrumbs
