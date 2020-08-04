/* eslint-disable no-alert */
import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios'
import RecordJSON from '../../backend/decorators/record-json.interface'
import { RecordActionResponse, ActionResponse, BulkActionResponse } from '../../backend/actions/action.interface'

let globalAny: any = {}

try {
  globalAny = window
} catch (error) {
  if (error.message !== 'window is not defined') {
    throw error
  } else {
    globalAny = { isOnServer: true }
  }
}

/**
 * Type of an [axios request]{@link https://github.com/axios/axios/blob/master/index.d.ts#L43}
 *
 * @typedef {object} AxiosRequestConfig
 * @alias AxiosRequestConfig
 * @memberof ApiClient
 * @see https://github.com/axios/axios/blob/master/index.d.ts#L43
 */

const checkResponse = (response: AxiosResponse): void => {
  if (globalAny.isOnServer) { return }
  const loginUrl = [globalAny.location.origin, globalAny.REDUX_STATE.paths.loginPath].join('')
  // if response has redirect to loginUrl
  if (response.request.responseURL
      && response.request.responseURL.match(loginUrl)
  ) {
    // eslint-disable-next-line no-undef
    alert('Your session expired. You will be redirected to login screen')
    globalAny.location.assign(loginUrl)
  }
}

/**
 * Extends {@link AxiosRequestConfig}
 *
 * @alias ResourceActionAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
 */
export type ResourceActionAPIParams = AxiosRequestConfig & {
  /**
   * id of a resource taken from {@link ResourceJSON}
   */
  resourceId: string;
  /**
   * action name taken from  {@link ActionJSON}
   */
  actionName: string;
  /**
   * query string
   */
  query?: string;
}

/**
 * Extends {@link AxiosRequestConfig}
 *
 * @alias RecordActionAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
 */
export type RecordActionAPIParams = AxiosRequestConfig & {
  /**
   * id of a record taken from {@link RecordJSON}
   */
  recordId: string;
  /**
   * id of a resource taken from {@link ResourceJSON}
   */
  resourceId: string;
  /**
   * action name taken from  {@link ActionJSON}
   */
  actionName: string;
}

/**
 * Extends {@link AxiosRequestConfig}
 *
 * @alias BulkActionAPIParams
 * @memberof ApiClient
 * @see https://github.com/axios/axios/blob/master/index.d.ts#L43
 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
 */
export type BulkActionAPIParams = AxiosRequestConfig & {
  /**
   * id of a record taken from {@link RecordJSON}
   */
  recordIds: Array<string>;
  /**
   * id of a resource taken from {@link ResourceJSON}
   */
  resourceId: string;
  /**
   * action name taken from  {@link ActionJSON}
   */
  actionName: string;
}


/**
 * Extends {@link AxiosRequestConfig}
 *
 * @alias GetPageAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
 */
export type GetPageAPIParams = AxiosRequestConfig & {
  /**
   * Unique page name
   */
  pageName: string;
}

/**
 * Client which access the admin API.
 * Use it to fetch data from auto generated AdminBro API.
 *
 * In the backend it uses [axios](https://github.com/axios/axios) client
 * library.
 *
 * Usage:
 * ```javascript
 * import { ApiClient } from 'admin-bro'
 *
 * const api = new ApiClient()
 * // fetching all records
 * api.resourceAction({ resourceId: 'Comments', actionName: 'list' }).then(results => {...})
 * ```
 * @see https://github.com/axios/axios
 */
class ApiClient {
  private baseURL: string

  private client: AxiosInstance

  constructor() {
    this.baseURL = ApiClient.getBaseUrl()
    this.client = axios.create({
      baseURL: this.baseURL,
    })
  }

  static getBaseUrl(): string {
    if (globalAny.isOnServer) { return '' }
    return [globalAny.location.origin, globalAny.REDUX_STATE?.paths.rootPath].join('')
  }

  /**
   * Search by query string for records in a given resource.
   *
   * @param   {Object}  options
   * @param   {String}  options.resourceId  id of a {@link ResourceJSON}
   * @param   {String}  options.query       query string
   *
   * @return  {Promise<SearchResponse>}
   */
  async searchRecords({ resourceId, query }: {
    resourceId: string;
    query: string;
  }): Promise<Array<RecordJSON>> {
    if (globalAny.isOnServer) { return [] }
    const actionName = 'search'
    const response = await this.resourceAction({ resourceId, actionName, query })
    checkResponse(response)
    return response.data.records
  }

  /**
   * Invokes given resource {@link Action} on the backend.
   *
   * @param   {ResourceActionAPIParams}     options
   * @return  {Promise<ActionResponse>}     response from an {@link Action}
   */
  async resourceAction(options: ResourceActionAPIParams): Promise<AxiosResponse<ActionResponse>> {
    const { resourceId, actionName, data, query, ...axiosParams } = options
    let url = `/api/resources/${resourceId}/actions/${actionName}`
    if (query) {
      const q = encodeURIComponent(query)
      url = [url, q].join('/')
    }
    const response = await this.client.request({
      url,
      method: data ? 'POST' : 'GET',
      ...axiosParams,
      data,
    })
    checkResponse(response)
    return response
  }

  /**
   * Invokes given record {@link Action} on the backend.
   *
   * @param   {RecordActionAPIParams} options
   * @return  {Promise<RecordActionResponse>}            response from an {@link Action}
   */
  async recordAction(options: RecordActionAPIParams): Promise<AxiosResponse<RecordActionResponse>> {
    const { resourceId, recordId, actionName, data, ...axiosParams } = options
    const response = await this.client.request({
      url: `/api/resources/${resourceId}/records/${recordId}/${actionName}`,
      method: data ? 'POST' : 'GET',
      ...axiosParams,
      data,
    })
    checkResponse(response)
    return response
  }

  /**
   * Invokes given bulk {@link Action} on the backend.
   *
   * @param   {BulkActionAPIParams} options
   * @return  {Promise<BulkActionResponse>}            response from an {@link Action}
   */
  async bulkAction(options: BulkActionAPIParams): Promise<AxiosResponse<BulkActionResponse>> {
    const { resourceId, recordIds, actionName, data, ...axiosParams } = options

    const params = new URLSearchParams()
    params.set('recordIds', recordIds.join(','))

    const response = await this.client.request({
      url: `/api/resources/${resourceId}/bulk/${actionName}`,
      method: data ? 'POST' : 'GET',
      ...axiosParams,
      data,
      params,
    })
    checkResponse(response)
    return response
  }

  /**
   * Invokes dashboard handler.
   *
   * @param   {AxiosRequestConfig}       options
   * @return  {Promise<any>}             response from the handler function defined in
   *                                     {@link AdminBroOptions#dashboard}
   */
  async getDashboard(options: AxiosRequestConfig = {}): Promise<any> {
    const response = await this.client.get('/api/dashboard', options)
    checkResponse(response)
    return response
  }

  /**
   * Invokes handler function of given page and returns its response.
   *
   * @param   {GetPageAPIParams}                options
   * @return  {Promise<any>}                    response from the handler of given page
   *                                            defined in {@link AdminBroOptions#pages}
   */
  async getPage(options: GetPageAPIParams): Promise<any> {
    const { pageName, ...axiosParams } = options
    const response = await this.client.request({
      url: `/api/pages/${pageName}`,
      ...axiosParams,
    })
    checkResponse(response)
    return response
  }
}

export default ApiClient
