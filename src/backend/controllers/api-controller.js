/* eslint no-unused-vars: 0 */
const { unflatten, flatten } = require('flat')
const populator = require('../utils/populator')
const Filter = require('../utils/filter')
const ViewHelpers = require('../utils/view-helpers')

/**
 * Controller responsible for the namespace: /admin_root/api/...
 * @private
 */
class ApiController {
  constructor({ admin }, currentAdmin) {
    this._admin = admin
    this.currentAdmin = currentAdmin
  }

  async index({ params, query, payload }, response) {
    const { resourceId } = params
    const { sortBy, direction, filters } = unflatten(query)
    let { page } = unflatten(query)
    const resource = this._admin.findResource(resourceId)

    const listProperties = resource.decorate().getListProperties()
    const firstProperty = listProperties[0]

    const perPage = 20
    page = Number(page) || 1
    const sort = {
      sortBy: sortBy || firstProperty.name(),
      direction: direction || 'asc',
    }
    const filter = await new Filter(filters, resource).populate()
    const records = await resource.find(filter, {
      limit: perPage,
      offset: (page - 1) * perPage,
      sort,
    })

    const populatedRecords = await populator(records, listProperties)

    const total = await resource.count(filter)
    return {
      meta: {
        total,
        perPage,
        page,
        direction: sort.direction,
        sortBy: sort.sortBy,
      },
      records: populatedRecords.map(r => r.toJSON()),
    }
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
      records: resources.map(res => res.toJSON()),
    }
  }

  async resourceAction(request, response) {
    const { resourceId, action } = request.params
    const h = new ViewHelpers(this._admin)
    const resource = this._admin.findResource(resourceId)
    const resourceAction = resource.decorate().resourceActions()
      .find(a => a.name === action)

    return resourceAction.handler(request, response, {
      resource, resourceAction, h,
    })
  }

  async recordAction(request, response) {
    const { resourceId, action, recordId } = request.params
    const h = new ViewHelpers(this._admin)
    const resource = this._admin.findResource(resourceId)
    const resourceAction = resource.decorate().recordActions()
      .find(a => a.name === action)

    return resourceAction.handler(request, response, {
      resource, resourceAction, h,
    })
  }

  async dashboard(request, response) {
    const h = new ViewHelpers(this._admin)
    const handler = this._admin.options.dashboard && this._admin.options.dashboard.handler
    if (handler) {
      return handler(request, response, { h })
    }
    return {
      message: 'You can override this method by setting up dashboard.handler fuction in AdminBro options',
    }
  }
}

module.exports = ApiController
