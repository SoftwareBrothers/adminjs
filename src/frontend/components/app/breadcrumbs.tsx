import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { Box } from '../design-system'

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }): string => theme.colors.greyLight};
  font-family: ${({ theme }): string => theme.font};
  line-height: ${({ theme }): string => theme.lineHeights.default};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  text-decoration: none;

  &:hover {
    color: ${({ theme }): string => theme.colors.bluePrimary};
  }

  &:after {
    content: '/';
    padding: 0 ${({ theme }): string => theme.space.default};
  }

  &:last-child {
    &:after {
      content: '';
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
      <BreadcrumbLink to={resource.href} className={record ? 'is-active' : ''}>
        {resource.name}
      </BreadcrumbLink>
    )
  }

  renderAction(): ReactNode {
    const { actionName, resource, record } = this.props
    const action = resource.resourceActions.find(a => a.name === actionName)
      || (record && record.recordActions.find(a => a.name === actionName))
    if (action) {
      return (
        <BreadcrumbLink to="#">{action.label}</BreadcrumbLink>
      )
    }
    return null
  }

  render(): ReactNode {
    return (
      <Box>
        {this.renderResource()}
        {this.renderAction()}
      </Box>
    )
  }
}

export default Breadcrumbs
