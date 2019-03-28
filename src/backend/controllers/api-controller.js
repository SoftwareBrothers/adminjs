/* eslint no-unused-vars: 0 */
const Filter = require('../utils/filter')

/**
 * Controller responsible for the namespace: /admin_root/api/...
 */
class ApiController {
  constructor({ admin }, currentAdmin) {
    this._admin = admin
    this.currentAdmin = currentAdmin
  }

  /**
   * @typedef {Object} ApiController~SearchResponse
   * @property {Array} records
   * @property {String} records[].title
   * @property {String} records[].id
   */

  /**
   * Handler function reponsible for a /admin_root/api/search/query route
   *
   * @param   {Object}  request
   * @param   {Object}  response
   *
   * @return  {ApiController~SearchResponse}    found records
   */
  async search(request, response) {
    const queryString = request.params && request.params.query
    const resource = this._admin.findResource(request.params.resourceId)
    const titlePropertyName = resource.decorate().titleProperty().name()

    const filters = queryString ? { [titlePropertyName]: queryString } : {}
    const filter = new Filter(filters, resource)

    const resources = await resource.find(filter, {
      limit: 50,
      sort: {
        sortBy: titlePropertyName,
        direction: 'asc',
      },
    })

    return {
      records: resources.map(res => ({
        title: res.param(titlePropertyName),
        id: res.id(),
      })),
    }
  }
}

module.exports = ApiController
