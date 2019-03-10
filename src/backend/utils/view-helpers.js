const paginate = require('jw-paginate')
const lodash = require('lodash')
const moment = require('moment')

/**
 * Collection of helper methods available in the views
 */
class ViewHelpers {
  constructor({ admin }) {
    this._admin = admin
    /**
     * Lodash
     * @type {Lodash}
     * @see https://lodash.com/
     */
    this._ = lodash

    /**
     * Moment
     * @type {Moment}
     * @see https://momentjs.com/
     */
    this.moment = moment

    /**
     * Paginate
     * @type {jw-paginate}
     * @see https://github.com/cornflourblue/jw-paginate
     */
    this.paginate = paginate

    /**
     * Branding options passed by the user.
     * `branding` subset of {@link AdminBroOptions}
     * @type {Object}
     */
    this.branding = this._admin.options.branding

    /**
     * Custom assets options passed by the user.
     * `assets` subset of {@link AdminBroOptions}
     * @type {Object}
     */
    this.customAssets = this._admin.options.assets
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
    const { rootPath } = this._admin.options
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
    return this._admin.options.loginPath
  }

  /**
   * Returns logout URL
   * @return {String}
   */
  logoutUrl() {
    return this._admin.options.logoutPath
  }

  /**
   * Returns URL for the dashboard
   * @return {String}
   */
  dashboardUrl() {
    return this._admin.options.rootPath
  }

  /**
   * Returns URL for the list view for a given resource
   * @param {BaseResource} resource
   * @param {Object} [query]
   * @return {String}
   */
  listUrl(resource, query) {
    return this.urlBuilder(['resources', resource.id()], query)
  }

  resourceActionUrl(resource, action) {
    return this.urlBuilder(['resources', resource.id(), action.name])
  }

  recordActionUrl(resource, action, record) {
    return this.urlBuilder(['resources', resource.id(), 'record', record.id(), action.name])
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
