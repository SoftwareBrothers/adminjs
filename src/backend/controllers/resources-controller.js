/* eslint no-unused-vars: 0 */
const BaseController = require('./base-controller.js')
const flatten = require('flat')

class ResourcesController extends BaseController {
  async index({ params, query, payload }, response) {
    this.findResources(params)
    this.data.records = await this.findRecords({ query })
    return this.render('pages/list', this.data)
  }

  async show({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    this.data.record = await this.data.currentResource.findOne(recordId)
    return this.render('pages/show', this.data)
  }

  async edit({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    this.data.record = await this.data.currentResource.findOne(recordId)
    return this.render('pages/edit', this.data)
  }

  async new({ params, query, payload }, response) {
    this.findResources(params)
    this.data.record = await this.data.currentResource.build()
    return this.render('pages/new', this.data)
  }

  async create({ params, query, payload }, response) {
    this.findResources(params)
    this.data.record = await this.data.currentResource.build(payload)
    this.data.record = await this.data.record.save()
    if (this.data.record.isValid()) {
      return response.redirect(this.data.h.showRecordUrl(
        this.data.currentResource,
        this.data.record,
      ))
    }
    this.storePayloadData(payload)
    return this.render('pages/new', this.data)
  }

  async update({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    this.data.record = await this.data.currentResource.findOne(recordId)
    await this.data.record.update(payload)
    if (this.data.record.isValid()) {
      return response.redirect(this.data.h.showRecordUrl(
        this.data.currentResource,
        this.data.record,
      ))
    }
    this.storePayloadData(payload)
    return this.render('pages/edit', this.data)
  }

  storePayloadData(payloadData) {
    Object.keys(payloadData).forEach(key => {
      if(this.data.record.params[key]) {
        this.data.record.params[key] = payloadData[key]
      }
    })
  }

  async custom(request, response) {
    const { data } = this
    this.findResources(request.params)
    const { recordId, actionId } = request.params
    data.record = await data.currentResource.findOne(recordId)
    const { record } = data
    data.customAction = {
      name: actionId,
      content: await data.currentResource
        .decorate()
        .getRecordActions(record)[actionId]
        .action(request, response, data),
    }
    return this.render('pages/show', data)
  }

  async delete({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    await this.data.currentResource.delete(recordId)
    return response.redirect(this.data.h.listUrl(
      this.data.currentResource,
    ))
  }

  findResources({ resourceId }) {
    this.data.currentResource = this._admin.findResource(resourceId)
    this.data.properties = this.data.currentResource.properties()
  }

  async findRecords({ query }) {
    this.data.perPage = 10
    const firstProperty = this.data.currentResource.decorate().getListProperties()[0]
    const { page, sortBy, direction } = query
    this.data.page = Number(page) || 1
    this.data.sort = {
      sortBy: sortBy || firstProperty.name(),
      direction: direction || 'asc',
    }
    const records = await this.data.currentResource.find({}, {
      limit: this.data.perPage,
      offset: (this.data.page - 1) * this.data.perPage,
      sort: this.data.sort,
    })
    this.data.total = await this.data.currentResource.count()
    return records
  }
}

module.exports = ResourcesController