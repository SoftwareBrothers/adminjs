const paginate = require('jw-paginate')
const lodash = require('lodash')

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
      const queryString = Object.keys(query).map(key => `${key}=${query[key]}`)
      url = `${url}?${queryString}`
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

  isMainColumn(propertyName) {
    return ['name', 'email', 'title', '_id'].includes(propertyName)
  }
}

module.exports = ViewHelpers
