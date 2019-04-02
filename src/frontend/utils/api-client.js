import axios from 'axios'

export default class ApiClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    })
  }

  async getRecords(resourceId, query) {
    return this.client.get(`/api/resources/${resourceId}`)
  }
}
