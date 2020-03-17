import ResourceJSON from '../../../../../backend/decorators/resource-json.interface'

/* eslint-disable no-param-reassign */
export default (resources: Array<ResourceJSON>): Array<{
  name: string;
  icon: string;
  resources: Array<ResourceJSON>;
}> => {
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
    name: parentName,
    icon: map[parentName].icon,
    resources: map[parentName],
  }))
}
