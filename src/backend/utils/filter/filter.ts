import * as flat from 'flat'
import BaseProperty from '../../adapters/property/base-property'
import BaseResource from '../../adapters/resource/base-resource'
import BaseRecord from '../../adapters/record/base-record'

export const PARAM_SEPARATOR = '~~'

export type FilterElement = {
  path: string;
  property: BaseProperty;
  value: string | {
    from: string;
    to: string;
  };
  populated?: BaseRecord | null;
}

interface ReduceCallback<T> {
  (memo: T, element: FilterElement): T;
}

/**
 * Filter object wrapping up selected filters.
 * @private
 */
export class Filter {
  public filters: {[key: string]: FilterElement}

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
  static normalizeKeys(filters): Map<string, any> {
    return flat.unflatten(flat.flatten(filters), { delimiter: PARAM_SEPARATOR })
  }

  /**
   * @param   {Object<String,Object | String>}  filters   selected filters
   * @param   {BaseResource}                    resource    resource which is filtered
   */
  constructor(filters = {}, resource) {
    this.resource = resource
    const normalized = Filter.normalizeKeys(filters)
    this.filters = Object.keys(normalized).reduce((memo, path) => {
      memo[path] = {
        path,
        property: this.resource.property(path),
        value: normalized[path],
      }

      return memo
    }, {})
  }

  /**
   * Returns filter for a given property key
   *
   * @param {String} key      property key
   * @returns {Filter.Property | undefined}
   */
  get(key: string): FilterElement | null {
    return this.filters[key]
  }

  /**
   * Populates all filtered properties which refers to other resources
   */
  async populate(): Promise<Filter> {
    const keys = Object.keys(this.filters)
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index]
      const referenceResource = this.resource.decorate().getPropertyByKey(key)?.reference()
      if (referenceResource) {
        this.filters[key].populated = await referenceResource.findOne(
          this.filters[key].value as string,
        )
      }
    }
    return this
  }

  reduce<T>(callback: ReduceCallback<T>, initial: T): T {
    return Object.values(this.filters).reduce(callback, initial || {} as T)
  }

  isVisible(): boolean {
    return !!Object.keys(this.filters).length
  }
}

export default Filter
