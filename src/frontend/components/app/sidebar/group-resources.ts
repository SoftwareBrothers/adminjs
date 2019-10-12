import ResourceJSON from '../../../../backend/decorators/resource-json.interface'

/* eslint-disable no-param-reassign */
export default (resources: Array<ResourceJSON>): Array<{
  name: string;
  icon: string;
  resources: Array<ResourceJSON>;
}> => {
  const visibleResources = resources.filter(res => (
    res.resourceActions.find(a => a.name === 'list')
  ))
  const map = visibleResources.reduce((memo, resource) => {
    if (memo[resource.parent.name]) {
      memo[resource.parent.name].push(resource)
    } else {
      memo[resource.parent.name] = [resource]
    }
    memo[resource.parent.name].icon = resource.parent.icon
    return memo
  }, {})
  return Object.keys(map).map(parentName => ({
    name: parentName,
    icon: map[parentName].icon,
    resources: map[parentName],
  }))
}
