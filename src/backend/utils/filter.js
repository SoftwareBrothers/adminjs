const { unflatten, flatten } = require('flat')

/**
 * @typedef {Object} Filter~Property
 * @property {String} key
 * @property {BaseProperty} property
 * @property {Object | String} value
 * @property {Object} populated
 */

/**
 * Filter object wrapping up selected filters.
 * @private
 */
class Filter {
  /**
   * Changes raw nested filters to form Object<path, value>.
   *
   * @example
   * const filters = {
   *  nested: {field: 'ala'},
   *  'dataField~~from': '2019-08-14'
   * }
   *
   * const normalized = Filter.normalizeFilters(filters)
   * // {
   * //   'nested.filter': 'ala',
   * //   'dataField': {from: '2019-08-14'}
   * // }
   *
   *
   * @param   {Object}  filters
   *
   * @return  {Object}
   */

  static normalizeKeys(filters) {
    return unflatten(flatten(filters), { delimiter: Filter.PARAM_SEPARATOR })
  }

  /**
   * @param   {Object<String,Object | String>}  filters   selected filters
   * @param   {BaseResource}                    resource    resource which is filtered
   */
  constructor(filters = {}, resource) {
    this.resource = resource
    /**
     * @type {Object<String, Filter~Property>}
     */
    const normalized = Filter.normalizeKeys(filters)
    this.filters = Object.keys(normalized).reduce((memo, path) => ({
      [path]: {
        path,
        property: this.resource.property(path),
        value: normalized[path],
      },
      ...memo,
    }), {})
  }

  /**
   * Returns filter for a given property key
   *
   * @param {String} key      property key
   * @returns {Filter.Property | undefined}
   */
  get(key) {
    return this.filters[key]
  }

  /**
   * Populates all filtered properties which referes to other resources
   */
  async populate() {
    const keys = Object.keys(this.filters)
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index]
      const referenceResource = this.resource.decorate().getPropertyByKey(key).reference()
      if (referenceResource) {
        this.filters[key].populated = await referenceResource.findOne(this.filters[key].value)
      }
    }
    return this
  }

  reduce(callback, initial = {}) {
    return Object.values(this.filters).reduce(callback, initial)
  }

  isVisible() {
    return !!Object.keys(this.filters).length
  }
}

Filter.PARAM_SEPARATOR = '~~'

module.exports = Filter
