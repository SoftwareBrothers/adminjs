import React, { ReactNode } from 'react'
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
 * @memberof Breadcrumbs
 */
type Props = {
  /**
   * Resource
   */
  resource: ResourceJSON;
  /**
   * record
   */
  record?: RecordJSON | null;
  /**
   * Name of an action
   */
  actionName: string;
}

/**
 * @component
 * @private
 */
class Breadcrumbs extends React.PureComponent<Props> {
  renderResource(): React.ReactNode {
    const { resource, record } = this.props
    return (
      <li>
        <BreadcrumbLink to={resource.href} className={record ? 'is-active' : ''}>
          {resource.name}
        </BreadcrumbLink>
      </li>
    )
  }

  renderAction(): ReactNode {
    const { actionName, resource, record } = this.props
    const action = resource.resourceActions.find(a => a.name === actionName)
      || (record && record.recordActions.find(a => a.name === actionName))
    if (action) {
      return (
        <li className="is-active">
          <BreadcrumbLink to="#">{action.label}</BreadcrumbLink>
        </li>
      )
    }
    return null
  }

  render(): ReactNode {
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
