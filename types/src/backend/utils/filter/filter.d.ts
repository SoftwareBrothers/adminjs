import BaseProperty from '../../adapters/property/base-property';
import BaseRecord from '../../adapters/record/base-record';
export declare const PARAM_SEPARATOR = "~~";
export declare type FilterElement = {
    path: string;
    property: BaseProperty;
    value: string | {
        from: string;
        to: string;
    };
    populated?: BaseRecord | null;
};
interface ReduceCallback<T> {
    (memo: T, element: FilterElement): T;
}
/**
 * Filter object wrapping up selected filters.
 * @private
 */
export declare class Filter {
    filters: {
        [key: string]: FilterElement;
    };
    private resource;
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
    static normalizeKeys(filters: any): Map<string, any>;
    /**
     * @param   {Object<String,Object | String>}  filters   selected filters
     * @param   {BaseResource}                    resource    resource which is filtered
     */
    constructor(filters: {} | undefined, resource: any);
    /**
     * Returns filter for a given property key
     *
     * @param {String} key      property key
     * @returns {Filter.Property | undefined}
     */
    get(key: string): FilterElement | null;
    /**
     * Populates all filtered properties which refers to other resources
     */
    populate(): Promise<Filter>;
    reduce<T>(callback: ReduceCallback<T>, initial: T): T;
    isVisible(): boolean;
}
export default Filter;
