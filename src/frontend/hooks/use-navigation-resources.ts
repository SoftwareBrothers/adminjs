import { useHistory, useLocation } from 'react-router'
/* eslint-disable no-param-reassign */
import {
  NavigationProps,
  NavigationElementProps,
  NavigationElementWithChildrenProps,
} from '@admin-bro/design-system'
import { useMemo } from 'react'
import { ResourceJSON } from '../interfaces'
import useLocalStorage from './use-local-storage/use-local-storage'

const isSelected = (href, location): boolean => {
  const regExp = new RegExp(`${href}($|/)`)
  return !!location.pathname.match(regExp)
}

export function useNavigationResources(
  resources: Array<ResourceJSON>,
): NavigationProps['elements'] {
  const [openElements, setOpenElements] = useLocalStorage<Record<string, boolean>>(
    'sidebarElements', {},
  )
  const history = useHistory()
  const location = useLocation()

  const enrichResource = useMemo(() => (
    resource: ResourceJSON,
    icon?: string,
  ): NavigationElementWithChildrenProps => ({
    href: resource.href || undefined,
    icon,
    isSelected: isSelected(resource.href, location),
    label: resource.name,
    id: resource.id,
    onClick: (event): void => {
      if (resource.href) {
        event.preventDefault()
        history.push(resource.href)
      }
    },
  }), [location, history])

  // grouping resources into parents
  const map = resources
    .filter(res => res.href) // first filter out resource which are not visible
    .reduce((memo, resource) => {
      // in case resource has the same name as parent we namespace it wit "resource-""
      const key = resource.navigation?.name || ['resource', resource.name].join('-')

      if (!resource.navigation || resource.navigation.name === null) {
        memo[key] = enrichResource(resource, resource.navigation?.icon)
      } else if (memo[key] && memo[key].elements && resource.navigation?.name) {
        (memo[key].elements as Array<NavigationElementProps>).push(enrichResource(resource))
      } else {
        memo[key] = {
          elements: [enrichResource(resource)],
          label: resource.navigation?.name,
          icon: resource.navigation?.icon,
          onClick: (): void => setOpenElements({
            ...openElements,
            [key]: !openElements[key],
          }),
          isOpen: !!openElements[key],
        }
      }
      return memo
    }, {} as Record<string, NavigationElementWithChildrenProps>)

  return Object.values(map)
}

export default useNavigationResources
