import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Box, Text, cssClass } from '@adminjs/design-system'

import { RecordJSON, ResourceJSON } from '../../interfaces'
import ViewHelpers from '../../../backend/utils/view-helpers/view-helpers'
import { useTranslation } from '../../hooks/use-translation'

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

export const BreadcrumbText = styled(Text)`
  color: ${({ theme }): string => theme.colors.grey40};
  font-family: ${({ theme }): string => theme.font};
  font-weight: ${({ theme }): string => theme.fontWeights.normal.toString()};
  line-height: ${({ theme }): string => theme.lineHeights.default};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  cursor: pointer;
  display: inline;

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

  const listAction = resource.resourceActions.find(({ name }) => name === 'list')
  const action = resource.actions.find(a => a.name === actionName)
  const h = new ViewHelpers()
  const { translateLabel: tl } = useTranslation()

  return (
    <Box flexGrow={1} className={cssClass('Breadcrumbs')}>
      <BreadcrumbLink to={h.dashboardUrl()}>{tl('dashboard')}</BreadcrumbLink>
      {listAction ? (
        <BreadcrumbLink
          to={resource.href ? resource.href : '/'}
          className={record ? 'is-active' : ''}
        >
          {resource.name}
        </BreadcrumbLink>
      ) : (
        <BreadcrumbText>{resource.name}</BreadcrumbText>
      )}
      {action && action.name !== 'list' && (
        <BreadcrumbLink to="#">{action.label}</BreadcrumbLink>
      )}
    </Box>
  )
}

export default Breadcrumbs
