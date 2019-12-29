import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios'
import RecordJSON from '../../backend/decorators/record-json.interface'
import { RecordActionResponse, ActionResponse, BulkActionResponse } from '../../backend/actions/action.interface'

let globalAny: any = {}

try {
  globalAny = window
} catch (error) {
  if (error.message !== 'window is not defined') {
    throw error
  }
}

const checkResponse = (response: AxiosResponse): void => {
  const loginUrl = [window.location.origin, globalAny.REDUX_STATE.paths.loginPath].join('')
  // if response has redirect to loginUrl
  if (response.request.responseURL
      && response.request.responseURL.match(loginUrl)
  ) {
    // eslint-disable-next-line no-undef
    alert('Your session expired. You will be redirected to login screen')
    window.location.assign(loginUrl)
  }
}

/**
 * @alias ResourceActionAPIParams
 * @memberof ApiClient
 * @extends AxiosRequestConfig
 */
export type ResourceActionAPIParams = AxiosRequestConfig & {
  /**
   * Id of a resource taken from {@link ResourceJSON}
   */
  resourceId: string;
  /**
   * Action name taken from  {@link ActionJSON}
   */
  actionName: string;
}

/**
 * @alias RecordActionAPIParams
 * @memberof ApiClient
 * @extends AxiosRequestConfig
 */
export type RecordActionAPIParams = AxiosRequestConfig & {
  /**
   * Id of a record taken from {@link RecordJSON}
   */
  recordId: string;
  /**
   * Id of a resource taken from {@link ResourceJSON}
   */
  resourceId: string;
  /**
   * Action name taken from  {@link ActionJSON}
   */
  actionName: string;
}

/**
 * @alias BulkActionAPIParams
 * @memberof ApiClient
 * @extends AxiosRequestConfig
 */
export type BulkActionAPIParams = AxiosRequestConfig & {
  /**
   * Id of a record taken from {@link RecordJSON}
   */
  recordIds: Array<string>;
  /**
   * Id of a resource taken from {@link ResourceJSON}
   */
  resourceId: string;
  /**
   * Action name taken from  {@link ActionJSON}
   */
  actionName: string;
}


/**
 * @alias GetPageAPIParams
 * @memberof ApiClient
 * @extends AxiosRequestConfig
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
 * api.getRecords({ resourceId: 'Comments' }).then(results => {...})
 * ```
 * @see https://github.com/axios/axios
 */
class ApiClient {
  private baseURL: string

  private client: AxiosInstance

  constructor() {
    this.baseURL = [window.location.origin, globalAny.REDUX_STATE.paths.rootPath].join('')
    this.client = axios.create({
      baseURL: this.baseURL,
    })
  }

  /**
   * Search by query string for records in a given resource.
   *
   * @param   {Object}  options
   * @param   {String}  options.resourceId  Id of a {@link ResourceJSON}
   * @param   {String}  options.query       query string
   *
   * @return  {Promise<Array<SearchRecord>>}
   */
  async searchRecords({ resourceId, query }: {
    resourceId: string;
    query: string;
  }): Promise<Array<RecordJSON>> {
    const q = encodeURIComponent(query)
    const response = await this.client.get(`/api/resources/${resourceId}/search/${q}`)
    checkResponse(response)
    return response.data.records
  }

  /**
   * Invokes given resource {@link Action} on the backend.
   *
   * @param   {ResourceActionAPIParams} options
   * @return  {Promise<Object>}            response from an {@link Action}
   */
  async resourceAction(options: ResourceActionAPIParams): Promise<AxiosResponse<ActionResponse>> {
    const { resourceId, actionName, data, ...axiosParams } = options
    const response = await this.client.request({
      url: `/api/resources/${resourceId}/actions/${actionName}`,
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
   * Invokes given record {@link Action} on the backend.
   *
   * @param   {BulkActionAPIParams} options
   * @return  {Promise<BulkActionResponse>}            response from an {@link Action}
   */
  async bulkAction(options: BulkActionAPIParams): Promise<AxiosResponse<BulkActionResponse>> {
    const { resourceId, recordIds, actionName, data, ...axiosParams } = options

    const params = new URLSearchParams()
    params.append('recordIds', recordIds.join(','))

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
   * @param   {AxiosRequestConfig}                options
   * @return  {Promise<any>}                      response from the dashboard handler
   */
  async getDashboard(options: AxiosRequestConfig = {}): Promise<any> {
    const response = await this.client.get('/api/dashboard', options)
    checkResponse(response)
    return response
  }

  /**
   * Invokes dashboard handler.
   *
   * @param   {GetPageAPIParams}                options
   * @return  {Promise<any>}                    response from the dashboard handler
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
