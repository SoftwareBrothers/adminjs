/**
 * Builds the sidebar from all resources
 *
 * @param {Array<BaseResource>} resources
 * @private
 */
const sidebarBuilder = resources => (
  resources.reduce((memo, resource) => {
    const parent = resource.decorate().getParent()
    const parentName = parent.name
    if (memo[parentName]) {
      memo[parentName].push(resource)
    } else {
      memo[parentName] = [resource] // eslint-disable-line no-param-reassign
    }
    memo[parentName].icon = parent.icon // eslint-disable-line no-param-reassign
    return memo
  }, {})
)

module.exports = sidebarBuilder
