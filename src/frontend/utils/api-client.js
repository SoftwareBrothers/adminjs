import axios from 'axios'

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
  constructor() {
    const baseURL = [window.location.origin, window.REDUX_STATE.paths.rootPath].join('')
    this.client = axios.create({
      baseURL,
    })
  }

  /**
   * Get records from a given resource
   *
   * @param   {String}  resourceId  Id of a {@link BaseResource~JSON}
   * @param   {ApiClient~RecordsQuery}  query       query object
   *
   * @return  {Promise<ApiController~ResourceResponse>}  response [axios](https://github.com/axios/axios)
   *                                                response with all the data
   */
  async getRecords({ resourceId, query }) {
    return this.client.get(`/api/resources/${resourceId}`, {
      params: query,
    })
  }

  /**
   * Search by query string for records in a given resource.
   *
   * @param   {String}  resourceId  Id of a {@link BaseResource~JSON}
   * @param   {String}  query       query string
   *
   * @return  {Promise<ApiController~SearchResponse>}
   */
  async searchRecords({ resourceId, query }) {
    const q = encodeURIComponent(query)
    const response = await this.client.get(`/api/resources/${resourceId}/search/${q}`)
    return response.data.records
  }

  /**
   * Invokes given resource {@link Action} on the backend.
   *
   * @param   {Object} options
   * @param   {String} options.resourceId  id of a {@link BaseResource}
   * @param   {String} options.actionName  name of an {@link Action}
   * @param   {Object} [options.payload]   optional action payload
   * @param   {Object} [options.params]    optional query params
   * @param   {String} [options.method]    if there is a Payload it sends
   *                                       POST request, otherwise GET.
   * @return  {Promise<Object>}            response from an {@link Action}
   */
  async resourceAction({ resourceId, actionName, payload, method, params }) {
    return this.client.request({
      url: `/api/resources/${resourceId}/actions/${actionName}`,
      method: method || payload ? 'POST' : 'GET',
      data: payload,
      params,
    })
  }

  /**
   * Invokes given record {@link Action} on the backend.
   *
   * @param   {Object} options
   * @param   {String} options.resourceId  id of a {@link BaseResource}
   * @param   {String} options.recordId    id of a {@link BaseRecord}
   * @param   {String} options.actionName  name of an {@link Action}
   * @param   {Object} [options.payload]   optional action payload
   * @param   {Object} [options.params]    optional query params
   * @param   {String} [options.method]    if there is a Payload it sends
   *                                       POST request, otherwise GET.
   * @return  {Promise<Object>}            response from an {@link Action}
   */
  async recordAction({ resourceId, recordId, actionName, payload, method, params }) {
    return this.client.request({
      url: `/api/resources/${resourceId}/records/${recordId}/${actionName}`,
      method: method || payload ? 'POST' : 'GET',
      data: payload,
      params,
    })
  }

  async getDashboard({ params = {} } = {}) {
    return this.client.get('/api/dashboard', {
      params,
    })
  }
}

export default ApiClient

/**
 * @typedef {Object} ApiClient~RecordsQuery
 * @property {Number} [page=1]
 * @property {Number} [perPage=10]
 * @property {Object} [filter]      filter which narrow down the search criteria
 *                                  in the for of a {key: value}, or {key: {from, to}}
 *                                  for dates.
 * @property {String} [direction]   sorting direction. Either `asc` or `desc`
 * @property {String} [sortBy]      property base on which results should be sorted
 */
