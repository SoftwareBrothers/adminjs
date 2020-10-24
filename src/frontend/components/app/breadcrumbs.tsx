import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Box, cssClass } from '@admin-bro/design-system'

import { RecordJSON, ResourceJSON } from '../../interfaces'
import ViewHelpers from '../../../backend/utils/view-helpers/view-helpers'

export const BreadcrumbLink = styled(Link)`
  color: ${({ theme }): string => theme.colors.grey40};
  font-family: ${({ theme }): string => theme.font};
  line-height: ${({ theme }): string => theme.lineHeights.default};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  text-decoration: none;

  &:hover {
    color: ${({ theme }): string => theme.colors.primary100};
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
export type BreadcrumbProps = {
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
export const Breadcrumbs: React.FC<BreadcrumbProps> = (props) => {
  const { resource, record, actionName } = props

  const action = resource.actions.find(a => a.name === actionName)
  const h = new ViewHelpers()

  return (
    <Box flexGrow={1} className={cssClass('Breadcrumbs')}>
      <BreadcrumbLink to={h.dashboardUrl()}>Dashboard</BreadcrumbLink>
      <BreadcrumbLink to={resource.href ? resource.href : '/'} className={record ? 'is-active' : ''}>
        {resource.name}
      </BreadcrumbLink>
      { action && action.name !== 'list' && <BreadcrumbLink to="#">{action.label}</BreadcrumbLink>}
    </Box>
  )
}

export default Breadcrumbs
