import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ResourceActionParams, BulkActionParams, RecordActionParams, ActionParams } from '../../backend/utils/view-helpers/view-helpers';
import { RecordJSON } from '../interfaces';
import { RecordActionResponse, ActionResponse, BulkActionResponse } from '../../backend/actions/action.interface';
/**
 * Extends {@link AxiosRequestConfig}
 *
 * @alias ActionAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
 */
export declare type ActionAPIParams = AxiosRequestConfig & ActionParams;
/**
 * Extends {@link ActionAPIParams}
 *
 * @alias ResourceActionAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
 */
export declare type ResourceActionAPIParams = AxiosRequestConfig & ResourceActionParams & {
    query?: string;
};
/**
 * Extends {@link ActionAPIParams}
 *
 * @alias RecordActionAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link ActionAPIParams}
 */
export declare type RecordActionAPIParams = AxiosRequestConfig & RecordActionParams;
/**
 * Extends {@link ActionAPIParams}
 *
 * @alias BulkActionAPIParams
 * @memberof ApiClient
 * @see https://github.com/axios/axios/blob/master/index.d.ts#L43
 * @property {any}   ...    any property supported by {@link ActionAPIParams}
 */
export declare type BulkActionAPIParams = AxiosRequestConfig & BulkActionParams;
/**
 * Extends {@link AxiosRequestConfig}
 *
 * @alias GetPageAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
 */
export declare type GetPageAPIParams = AxiosRequestConfig & {
    /**
     * Unique page name
     */
    pageName: string;
};
/**
 * Client which access the admin API.
 * Use it to fetch data from auto generated AdminJS API.
 *
 * In the backend it uses [axios](https://github.com/axios/axios) client
 * library.
 *
 * Usage:
 * ```javascript
 * import { ApiClient } from 'adminjs'
 *
 * const api = new ApiClient()
 * // fetching all records
 * api.resourceAction({ resourceId: 'Comments', actionName: 'list' }).then(results => {...})
 * ```
 * @see https://github.com/axios/axios
 * @hideconstructor
 */
declare class ApiClient {
    private baseURL;
    private client;
    constructor();
    static getBaseUrl(): string;
    /**
     * Search by query string for records in a given resource.
     *
     * @param   {Object}  options
     * @param   {String}  options.resourceId  id of a {@link ResourceJSON}
     * @param   {String}  options.query       query string
     *
     * @return  {Promise<SearchResponse>}
     */
    searchRecords({ resourceId, query }: {
        resourceId: string;
        query: string;
    }): Promise<Array<RecordJSON>>;
    /**
     * Invokes given resource {@link Action} on the backend.
     *
     * @param   {ResourceActionAPIParams}     options
     * @return  {Promise<ActionResponse>}     response from an {@link Action}
     */
    resourceAction(options: ResourceActionAPIParams): Promise<AxiosResponse<ActionResponse>>;
    /**
     * Invokes given record {@link Action} on the backend.
     *
     * @param   {RecordActionAPIParams} options
     * @return  {Promise<RecordActionResponse>}            response from an {@link Action}
     */
    recordAction(options: RecordActionAPIParams): Promise<AxiosResponse<RecordActionResponse>>;
    /**
     * Invokes given bulk {@link Action} on the backend.
     *
     * @param   {BulkActionAPIParams} options
     * @return  {Promise<BulkActionResponse>}            response from an {@link Action}
     */
    bulkAction(options: BulkActionAPIParams): Promise<AxiosResponse<BulkActionResponse>>;
    /**
     * Invokes dashboard handler.
     *
     * @param   {AxiosRequestConfig}       options
     * @return  {Promise<AxiosResponse<any>>} response from the handler function defined in
     *                                     {@link AdminJSOptions#dashboard}
     */
    getDashboard(options?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    /**
     * Invokes handler function of given page and returns its response.
     *
     * @param   {GetPageAPIParams}                options
     * @return  {Promise<AxiosResponse<any>>}     response from the handler of given page
     *                                            defined in {@link AdminJSOptions#pages}
     */
    getPage(options: GetPageAPIParams): Promise<AxiosResponse<any>>;
}
export { ApiClient as default, ApiClient, };
