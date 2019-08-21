/**
 * Collection of helper methods available in the views
 */
class ViewHelpers {
  constructor({ options } = {}) {
    let opts = options || (window && window.REDUX_STATE && window.REDUX_STATE.paths)

    opts = opts || {
      rootPath: '/admin',
    }

    // when ViewHelpers are used on the frontend, paths are taken from global Redux State
    this.options = opts
  }

  /**
   * To each related path adds rootPath passed by the user, as well as a query string
   * @param  {String[]} paths   list of parts of the url
   * @return {String}       path
   */
  urlBuilder(paths) {
    const { rootPath } = this.options
    return `${rootPath}/${paths.join('/')}`
  }

  /**
   * Returns login URL
   * @return {String}
   */
  loginUrl() {
    return this.options.loginPath
  }

  /**
   * Returns logout URL
   * @return {String}
   */
  logoutUrl() {
    return this.options.logoutPath
  }

  listUrl({ resourceId }) {
    console.warn(`
      Deprecation: this "ViewHelpers#listUrl" will be removed in the next versions.
      Please use "resourceActionUrl({ resourceId, actionName: 'list'})"
      instead`)
    return this.resourceActionUrl({ resourceId, actionName: 'list' })
  }

  /**
   * Returns URL for the dashboard
   * @return {String}
   */
  dashboardUrl() {
    return this.options.rootPath
  }

  resourceActionUrl({ resourceId, actionName }) {
    return this.urlBuilder(['resources', resourceId, 'actions', actionName])
  }

  recordActionUrl({ resourceId, recordId, actionName }) {
    return this.urlBuilder(['resources', resourceId, 'records', recordId, actionName])
  }

  /**
   * Returns absolute path to a given asset
   * @param  {String} asset
   * @return {String}
   */
  assetPath(asset) {
    return this.urlBuilder(['frontend', 'assets', asset])
  }
}

module.exports = ViewHelpers
