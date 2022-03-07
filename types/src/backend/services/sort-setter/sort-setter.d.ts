import { ResourceOptions } from '../../decorators/resource/resource-options.interface';
declare const DEFAULT_DIRECTION = "asc";
declare type Sort = {
    direction: 'asc' | 'desc';
    sortBy: string;
};
/**
 * Sets sort parameters for a list.
 *
 * @private
 *
 * @param {object}  query
 * @param {string}  [query.direction]   either `asc` or `desc`
 * @param {string}  [query.sortBy]      sort by field passed in query
 * @param {string}  firstPropertyName   property name which will be taken as a default
 * @param {ResourceOptions} resourceOptions={}  options passed along with given resource
 * @return {Sort}
 */
declare const sortSetter: {
    ({ direction, sortBy }: {
        direction?: "desc" | "asc" | undefined;
        sortBy?: string | undefined;
    } | undefined, firstPropertyName: string, resourceOptions?: ResourceOptions): Sort;
    DEFAULT_DIRECTION: string;
};
export { DEFAULT_DIRECTION };
export default sortSetter;
