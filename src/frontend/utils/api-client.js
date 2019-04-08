import axios from 'axios'

export default class ApiClient {
  constructor() {
    const baseURL = [window.location.origin, window.REDUX_STATE.paths.rootPath].join('')
    this.client = axios.create({
      baseURL,
    })
  }

  async getRecords(resourceId, query) {
    return this.client.get(`/api/resources/${resourceId}`)
  }

  async searchRecords(resourceId, query) {
    const q = encodeURIComponent(query)
    const response = await this.client.get(`/api/resources/${resourceId}/search/${q}`)
    return response.data.records
  }

  async resourceAction({ resourceId, actionName, payload, method }) {
    return this.client.request({
      url: `/api/resources/${resourceId}/actions/${actionName}`,
      method: method || payload ? 'POST' : 'GET',
      data: payload,
    })
  }
}
