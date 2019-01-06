const paginate = require('jw-paginate')
const lodash = require('lodash')
const moment = require('moment')

/**
 * Collection of helper methods available in the views
 *
 * @example
 * a.button.is-primary(href=h.newRecordUrl(currentResource))
 *   span.icon
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
  }

  getObjectKeyWithValue(obj, key) {
    const value = obj[key]
    return typeof value === 'object'
      ? this.getQueryPath(value) : `${key}=${value}`
  }

  getQueryPath(query) {
    const queryPath = []
    Object.keys(query).forEach((key) => {
      if (query[key]) {
        queryPath.push(this.getObjectKeyWithValue(query, key))
      }
    })
    return queryPath.join('&')
  }

  /**
   * To each related path adds rootPath passed by the user. And it
   * adds query strig
   * @param  {String[]} paths   list of parts of the url.
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
   * Returns URL for the list view for given resource
   * @param {BaseResource} resource
   * @param {Object} [query]
   * @return {String}
   */
  listUrl(resource, query) {
    return this.urlBuilder(['resources', resource.id()], query)
  }

  /**
   * Returns URL for the `new` view for given resource
   * @param {BaseResource} resource
   * @return {String}
   */
  newRecordUrl(resource) {
    return this.urlBuilder(['resources', resource.id(), 'new'])
  }

  /**
   * Returns URL for the list view for record in given resource
   * @param {BaseResource} resource
   * @param {BaseRecord} record
   * @return {String}
   */
  showRecordUrl(resource, record) {
    return this.urlBuilder(['resources', resource.id(), record.id()])
  }

  /**
   * Returns URL for the edit view for record in given resource
   * @param {BaseResource} resource
   * @param {BaseRecord} record
   * @return {String}
   */
  editRecordUrl(resource, record) {
    return this.urlBuilder(['resources', resource.id(), record.id(), 'edit'])
  }

  /**
   * Returns URL for the delete action for record in given resource
   * @param {BaseResource} resource
   * @param {BaseRecord} record
   * @return {String}
   */
  deleteRecordUrl(resource, record) {
    return this.urlBuilder(['resources', resource.id(), record.id(), 'delete'])
  }

  /**
   * Returns URL for the custom action user defined in the resource decorator
   * @param {BaseResource}  resource
   * @param {BaseRecord}    record
   * @param {String}        actionId      id of the action
   * @return {String}
   */
  customRecordActionUrl(resource, record, actionId) {
    return this.urlBuilder(['resources', resource.id(), record.id(), actionId])
  }

  /**
   * Returns absolute path to given asset
   * @param  {String} asset
   * @return {String}
   */
  assetPath(asset) {
    return this.urlBuilder(['frontend', 'assets', asset])
  }
}

module.exports = ViewHelpers
