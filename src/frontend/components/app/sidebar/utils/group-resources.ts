import { NavigationElementProps, NavigationProps } from '@admin-bro/design-system'
import ResourceJSON from '../../../../../backend/decorators/resource-json.interface'

const resourceToNavigationElement = (
  resource: ResourceJSON,
): NavigationElementProps => ({
  href: resource.href || undefined,
  label: resource.name,
})

/* eslint-disable no-param-reassign */
export default (resources: Array<ResourceJSON>): NavigationProps['elements'] => {
  const visibleResources = resources.filter(res => res.href)
  const map = visibleResources.reduce((memo, resource) => {
    const key = resource.parent?.name || ''
    if (memo[key]) {
      memo[key].push(resource)
    } else {
      memo[key] = [resource]
    }
    memo[key].icon = resource.parent?.icon
    return memo
  }, {})
  return Object.keys(map).map(parentName => ({
    label: parentName,
    icon: map[parentName].icon,
    elements: map[parentName].map(resourceToNavigationElement),
  }))
}
