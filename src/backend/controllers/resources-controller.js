/* eslint-disable object-curly-newline */
/* eslint no-unused-vars: 0 */
const { unflatten, flatten } = require('flat')
const BaseController = require('./base-controller.js')

class ResourcesController extends BaseController {
  async index({ params, query, payload }, response) {
    this.findResources(params)
    this.data.records = await this.findRecords({ query })
    return this.render('pages/list', this.data)
  }

  async show({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    this.data.record = await this.data.resource.findOne(recordId)
    return this.render('pages/show', this.data)
  }

  async edit({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    this.data.record = await this.data.resource.findOne(recordId)
    return this.render('pages/edit', this.data)
  }

  async new({ params, query, payload }, response) {
    this.findResources(params)
    this.data.record = await this.data.resource.build()
    return this.render('pages/new', this.data)
  }

  async create({ params, query, payload }, response) {
    this.findResources(params)
    this.data.record = await this.data.resource.build(payload)
    this.data.record = await this.data.record.save()
    if (this.data.record.isValid()) {
      return response.redirect(this.data.h.showRecordUrl(
        this.data.resource,
        this.data.record,
      ))
    }
    return this.render('pages/new', this.data)
  }

  async update({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    this.data.record = await this.data.resource.findOne(recordId)
    await this.data.record.update(payload)
    if (this.data.record.isValid()) {
      return response.redirect(this.data.h.showRecordUrl(
        this.data.resource,
        this.data.record,
      ))
    }
    return this.render('pages/edit', this.data)
  }

  async custom(request, response) {
    const { data } = this
    this.findResources(request.params)
    const { recordId, actionId } = request.params
    data.record = await data.resource.findOne(recordId)
    const { record } = data
    data.customAction = {
      name: actionId,
      content: await data.resource
        .decorate()
        .getRecordActions(record)[actionId]
        .action(request, response, data),
    }
    return this.render('pages/show', data)
  }

  async delete({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    await this.data.resource.delete(recordId)
    return response.redirect(this.data.h.listUrl(
      this.data.resource,
    ))
  }

  findResources({ resourceId }) {
    this.data.resource = this._admin.findResource(resourceId)
    this.data.properties = this.data.resource.properties()
  }

  async findRecords({ query }) {
    this.data.perPage = 10
    const firstProperty = this.data.resource.decorate().getListProperties()[0]
    const { page, sortBy, direction, filters } = unflatten(query)
    this.data.page = Number(page) || 1
    this.data.sort = {
      sortBy: sortBy || firstProperty.name(),
      direction: direction || 'asc',
    }
    this.data.filters = filters ? flatten({ filters }) : {}
    const records = await this.data.resource.find(filters, {
      limit: this.data.perPage,
      offset: (this.data.page - 1) * this.data.perPage,
      sort: this.data.sort,
    })
    this.data.total = await this.data.resource.count(filters)
    return records
  }
}

module.exports = ResourcesController
