import React from 'react'
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
const Breadcrumbs: React.FC<Props> = (props) => {
  const { resource, record, actionName } = props

  const action = resource.actions.find(a => a.name === actionName)

  return (
    <Box flexGrow={1}>
      <BreadcrumbLink to={resource.href} className={record ? 'is-active' : ''}>
        {resource.name}
      </BreadcrumbLink>
      {action && record ? (<BreadcrumbLink to="#">{action.label}</BreadcrumbLink>) : null}
    </Box>
  )
}

export default Breadcrumbs
