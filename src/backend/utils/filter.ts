import { unflatten, flatten }  from 'flat'
import { BaseResource } from '../../admin-bro'
import BaseProperty from '../adapters/base-property'

/**
 * @typedef {Object} Filter~Property
 * @property {String} key
 * @property {BaseProperty} property
 * @property {Object | String} value
 * @property {Object} populated
 */

export const PARAM_SEPARATOR = '~~'

export type FilterElement = {
  path: string,
  property: BaseProperty
  value: any,
}

/**
 * Filter object wrapping up selected filters.
 * @private
 */
export default class Filter {
  public filters: Map<String, FilterElement> | {}
  private resource: BaseResource
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

  static normalizeKeys(filters): Map<String, any> {
    return unflatten(flatten(filters), { delimiter: PARAM_SEPARATOR })
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
