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
   * Generates filter key for a given property. It performs 2 operations:
   *
   * - adds prefix `filter.` to a property name
   * - replaces all dots to double dashes
   *
   * Why we replace dots: this is bacause when we will have nested
   * field like `place.date` we would like it to be present in filters in a following
   * fashion:
   * ```
   * filters: {
   *   'place.date': {
   *     from: someDate,
   *     to: someOtherDate,
   *   },
   * }
   * ```
   * if we don't replace dots they will be unflatten and we will have filters:
   * `{place: {date: {from...}}}`.
   *
   * So the idea is to replace dots to double dashes, and then (after unflattening) - change these
   * double dashes again to dots.
   *
   * @param   {BaseProperty}  property
   *
   * @return  {String}
   */
  static toFilterKey(property) {
    const escaped = property.name().replace(/\./g, '--')
    return `filters.${escaped}`
  }

  /**
   * Replaces escaped filter key to path
   *
   * @param   {String}  filterKey  escaped filter key
   *
   * @return  {String}
   * @see Filter.toFilterKey
   */
  static filterKeyToPath(filterKey) {
    return filterKey.replace(/--/g, '.')
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
    this.filters = Object.keys(filters).reduce((memo, key) => {
      const path = Filter.filterKeyToPath(key)
      return {
        [path]: {
          path,
          property: this.resource.property(path),
          value: filters[key],
        },
        ...memo,
      }
    }, {})
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
      const referenceResource = this.resource.decorate().property(key).reference()
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

module.exports = Filter
