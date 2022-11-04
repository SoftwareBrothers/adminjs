import { AdminJSOptions, Assets } from '../../../adminjs-options.interface';
import { Paths } from '../../../frontend/store/store';
/**
 * Base Params for a any function
 * @alias ActionParams
 * @memberof ViewHelpers
 */
export declare type ActionParams = {
    /**
     * Unique Resource ID
     */
    resourceId: string;
    /**
     * Action name
     */
    actionName: string;
    /**
     * Optional query string: ?....
     */
    search?: string;
};
/**
 * Params for a record action
 * @alias RecordActionParams
 * @extends ActionParams
 * @memberof ViewHelpers
 */
export declare type RecordActionParams = ActionParams & {
    /**
     * Record ID
     */
    recordId: string;
};
/**
 * Params for a bulk action
 * @alias BulkActionParams
 * @extends ActionParams
 * @memberof ViewHelpers
 */
export declare type BulkActionParams = ActionParams & {
    /**
     * Array of Records ID
     */
    recordIds?: Array<string>;
};
/**
 * Params for a resource action
 * @alias ResourceActionParams
 * @extends ActionParams
 * @memberof ViewHelpers
 */
export declare type ResourceActionParams = ActionParams;
/**
 * Collection of helper methods available in the views
 */
export declare class ViewHelpers {
    options: Paths;
    constructor({ options }?: {
        options?: AdminJSOptions;
    });
    static getPaths(options?: AdminJSOptions): Paths;
    /**
     * To each related path adds rootPath passed by the user, as well as a query string
     * @private
     * @param  {Array<string>} [paths]      list of parts of the url
     * @return {string}       path
     * @return {query}        [search=''] query string which can be fetch
     *                                    from `location.search`
     */
    urlBuilder(paths?: Array<string>, search?: string): string;
    /**
     * Returns login URL
     * @return {string}
     */
    loginUrl(): string;
    /**
     * Returns logout URL
     * @return {string}
     */
    logoutUrl(): string;
    /**
     * Returns URL for the dashboard
     * @return {string}
     */
    dashboardUrl(): string;
    /**
     * Returns URL for given page name
     * @param {string} pageName       page name which is a unique key specified in
     *                                {@link AdminJSOptions}
     * @return {string}
     */
    pageUrl(pageName: string): string;
    /**
     * Returns url for a `edit` action in given Resource. Uses {@link recordActionUrl}
     *
     * @param {string} resourceId  id to the resource
     * @param {string} recordId    id to the record
     * @param {string} [search]        optional query string
     */
    editUrl(resourceId: string, recordId: string, search?: string): string;
    /**
     * Returns url for a `show` action in given Resource. Uses {@link recordActionUrl}
     *
     * @param {string} resourceId  id to the resource
     * @param {string} recordId    id to the record
     * @param {string} [search]        optional query string
     */
    showUrl(resourceId: string, recordId: string, search?: string): string;
    /**
     * Returns url for a `delete` action in given Resource. Uses {@link recordActionUrl}
     *
     * @param {string} resourceId  id to the resource
     * @param {string} recordId    id to the record
     * @param {string} [search]        optional query string
     */
    deleteUrl(resourceId: string, recordId: string, search?: string): string;
    /**
     * Returns url for a `new` action in given Resource. Uses {@link resourceActionUrl}
     *
     * @param {string} resourceId  id to the resource
     * @param {string} [search]        optional query string
     */
    newUrl(resourceId: string, search?: string): string;
    /**
     * Returns url for a `list` action in given Resource. Uses {@link resourceActionUrl}
     *
     * @param {string} resourceId  id to the resource
     * @param {string} [search]        optional query string
     */
    listUrl(resourceId: string, search?: string): string;
    /**
     * Returns url for a `bulkDelete` action in given Resource. Uses {@link bulkActionUrl}
     *
     * @param {string} resourceId  id to the resource
     * @param {Array<string>} recordIds   separated by comma records
     * @param {string} [search]        optional query string
     */
    bulkDeleteUrl(resourceId: string, recordIds: Array<string>, search?: string): string;
    /**
     * Returns resourceAction url
     *
     * @param   {ResourceActionParams}  options
     * @param   {string}  options.resourceId
     * @param   {string}  options.actionName
     * @param   {string}  [options.search]        optional query string
     *
     * @return  {string}
     */
    resourceActionUrl({ resourceId, actionName, search }: ResourceActionParams): string;
    resourceUrl({ resourceId, search }: Omit<ResourceActionParams, 'actionName'>): string;
    /**
     * Returns recordAction url
     *
     * @param   {RecordActionParams}  options
     * @param   {string}  options.resourceId
     * @param   {string}  options.recordId
     * @param   {string}  options.actionName
     *
     * @return  {string}
     */
    recordActionUrl({ resourceId, recordId, actionName, search }: RecordActionParams): string;
    /**
     * Returns bulkAction url
     *
     * @param   {BulkActionParams}  options
     * @param   {string}  options.resourceId
     * @param   {Array<string>}  [options.recordIds]
     * @param   {string}  options.actionName
     *
     * @return  {string}
     */
    bulkActionUrl({ resourceId, recordIds, actionName, search }: BulkActionParams): string;
    /**
     * Returns absolute path to a given asset.
     * @private
     *
     * @param  {string} asset
     * @param  {Assets | undefined} assetsConfig
     * @return {string}
     */
    assetPath(asset: string, assetsConfig?: Assets): string;
}
export default ViewHelpers;
