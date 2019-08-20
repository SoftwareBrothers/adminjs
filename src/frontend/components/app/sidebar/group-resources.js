/* eslint-disable no-param-reassign */
export default (resources) => {
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
