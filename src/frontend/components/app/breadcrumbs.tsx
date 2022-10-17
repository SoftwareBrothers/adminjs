import { Box, cssClass, Text } from '@adminjs/design-system'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import ViewHelpers from '../../../backend/utils/view-helpers/view-helpers'
import allowOverride from '../../hoc/allow-override'
import { useTranslation } from '../../hooks/use-translation'
import { RecordJSON, ResourceJSON } from '../../interfaces'
import { getActionElementCss } from '../../utils'

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
  resource: ResourceJSON
  /**
   * record
   */
  record?: RecordJSON | null
  /**
   * Name of an action
   */
  actionName: string
}

/**
 * @component
 * @private
 */
const Breadcrumbs: React.FC<BreadcrumbProps> = (props) => {
  const { resource, record, actionName } = props

  const listAction = resource.resourceActions.find(({ name }) => name === 'list')
  const action = resource.actions.find((a) => a.name === actionName)
  const h = new ViewHelpers()
  const { translateLabel: tl } = useTranslation()
  const contentTag = getActionElementCss(resource.id, actionName, 'breadcrumbs')
  return (
    <Box flexGrow={1} className={cssClass('Breadcrumbs')} data-css={contentTag}>
      <BreadcrumbLink to={h.dashboardUrl()}>{tl('dashboard')}</BreadcrumbLink>
      {listAction ? (
        <BreadcrumbLink to={resource.href ? resource.href : '/'} className={record ? 'is-active' : ''}>
          {resource.name}
        </BreadcrumbLink>
      ) : (
        <BreadcrumbText>{resource.name}</BreadcrumbText>
      )}
      {action && action.name !== 'list' && <BreadcrumbLink to="#">{action.label}</BreadcrumbLink>}
    </Box>
  )
}

const OverridableBreadcrumbs = allowOverride(Breadcrumbs, 'Breadcrumbs')

export { OverridableBreadcrumbs as default, OverridableBreadcrumbs as Breadcrumbs }
