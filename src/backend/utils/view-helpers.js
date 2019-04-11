/**
 * Collection of helper methods available in the views
 */
class ViewHelpers {
  constructor({ options } = {} ) {
    const opts = options || (window && window.REDUX_STATE.paths)

    // when ViewHelpers are used on the frontend, paths are taken from global Redux State
    this.options = opts
  }

  /**
   * To each related path adds rootPath passed by the user, as well as a query string
   * @param  {String[]} paths   list of parts of the url
   * @param  {Object}   query object used to build query string
   * @return {String}       path
   */
  urlBuilder(paths, query) {
    const { rootPath } = this.options
    let url = `${rootPath}/${paths.join('/')}`
    if (query) {
      url = `${url}?${this.getQueryPath(query)}`
    }
    return url
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

  /**
   * Returns URL for the dashboard
   * @return {String}
   */
  dashboardUrl() {
    return this.options.rootPath
  }

  /**
   * Returns URL for the list view for a given resource
   * @param {BaseResource} resource
   * @param {Object} [query]
   * @return {String}
   */
  listUrl(resourceId, query) {
    return this.urlBuilder(['resources', resourceId], query)
  }

  resourceActionUrl(resourceId, actionName) {
    return this.urlBuilder(['resources', resourceId, 'actions', actionName])
  }

  recordActionUrl(resourceId, recordId, actionName) {
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
