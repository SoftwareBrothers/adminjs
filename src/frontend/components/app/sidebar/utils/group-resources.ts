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
    // in case resource has the same name as parent we namespace it wit "resource-""
    const key = resource.parent?.name || ['resource', resource.name].join('-')

    if (!resource.parent || resource.parent.name === null) {
      memo[key] = resource
    } else if (resource.parent?.name && memo[key]) {
      memo[key].push(resource)
    } else {
      memo[key] = [resource]
    }

    memo[key].icon = memo[key].icon || resource.parent?.icon
    return memo
  }, {})

  return Object.keys(map).map((parentName) => {
    if (!Array.isArray(map[parentName])) {
      return {
        ...resourceToNavigationElement(map[parentName]),
        icon: map[parentName].icon,
        elements: [],
      }
    }
    return {
      label: parentName,
      icon: map[parentName].icon,
      elements: map[parentName].map(resourceToNavigationElement),
    }
  })
}
