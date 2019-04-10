/**
 * Collection of helper methods available in the views
 */
class ViewHelpers {
  constructor({ options } = {} ) {
    const opts = options || (window && window.REDUX_STATE.paths)

    // when ViewHelpers are used on the frontend, paths are taken from global Redux State
    this.options = opts

    /**
     * Branding options passed by the user.
     * `branding` subset of {@link AdminBroOptions}
     * @type {Object}
     */
    this.branding = this.options.branding

    /**
     * Custom assets options passed by the user.
     * `assets` subset of {@link AdminBroOptions}
     * @type {Object}
     */
    this.customAssets = this.options.assets
  }

  /**
   * @todo handle Scripts and Styles in resources:
   *
   * ```
   * for script in resource.decorate().customHeadScripts().scripts
   *   script(defer src=script)
   * for style in resource.decorate().customHeadScripts().styles
   *   link(rel="stylesheet" href=style)
   * ```
   */

  headScripts() {
    return [
      'https://use.fontawesome.com/releases/v5.3.1/js/all.js',
      ...((this.customAssets && this.customAssets.styles) || []),
    ].map(s => `<script src="${s}"></script>`)
  }

  headStyles() {
    return [
      'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/font-mfizz/2.4.1/font-mfizz.min.css',
      'https://fonts.googleapis.com/css?family=Roboto:400,700',
      ...((this.customAssets && this.customAssets.scripts) || []),
      this.assetPath('style.min.css'),
    ].map(l => `<link rel="stylesheet" type="text/css" href="${l}">`)
  }

  /**
   * Returns query param path
   * @param  {Object} query object with query params
   * @param  {String} key query param name
   */
  getQueryParamPath(query, key) {
    const value = query[key]
    return typeof value === 'object'
      ? this.getQueryPath(value) : `${key}=${value}`
  }

  /**
   * Returns path including all query params
   * @param  {Object} query object used to build query string
   */
  getQueryPath(query) {
    const queryPath = []
    Object.keys(query).forEach((key) => {
      if (query[key]) {
        queryPath.push(this.getQueryParamPath(query, key))
      }
    })
    return queryPath.join('&')
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

  apiSearch(resource) {
    return this.urlBuilder(['api', 'resources', resource.id(), 'search'])
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
