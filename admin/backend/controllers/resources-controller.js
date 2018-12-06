const BaseController = require('./base-controller.js')

class ResourcesController extends BaseController {
  async index({ params, query, payload }, response) {
    this.findResources(params)
    this.view.records = await this.findRecords({ query })
    return this.render('pages/list', this.view)
  }

  async show({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    this.view.record = await this.view.currentResource.findOne(recordId)
    return this.render('pages/show', this.view)
  }

  async edit({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    this.view.record = await this.view.currentResource.findOne(recordId)
    return this.render('pages/edit', this.view)
  }

  async new({ params, query, payload }, response) {
    this.findResources(params)
    this.view.record = this.view.currentResource.build()
    return this.render('pages/new', this.view)
  }

  async create({ params, query, payload }, response) {
    this.findResources(params)
    this.view.record = this.view.currentResource.build(payload)
    this.view.record = await this.view.record.save()
    if (this.view.record.isValid()) {
      return response.redirect(this.view.h.showRecordUrl(
        this.view.currentResource,
        this.view.record,
      ))
    }
    return this.render('pages/new', this.view)
  }

  async update({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    this.view.record = await this.view.currentResource.findOne(recordId)
    await this.view.record.update(payload)
    if (this.view.record.isValid()) {
      return response.redirect(this.view.h.showRecordUrl(
        this.view.currentResource,
        this.view.record,
      ))
    }
    return this.render('pages/edit', this.view)
  }

  async delete({ params, query, payload }, response) {
    this.findResources(params)
    const { recordId } = params
    await this.view.currentResource.delete(recordId)
    return response.redirect(this.view.h.listUrl(
      this.view.currentResource,
    ))
  }

  findResources({ resourceName }) {
    this.view.currentResource = this._admin.findResource(resourceName)
    this.view.properties = this.view.currentResource.properties()
  }

  async findRecords({ query }) {
    this.view.perPage = 10
    this.view.total = await this.view.currentResource.count()
    const firstProperty = this.view.currentResource.decorate().getListProperties()[0]
    const { page, sortBy, sortDirection } = query
    this.view.page = page || 1
    this.view.sort = {
      sortBy: sortBy || firstProperty.name(),
      direction: sortDirection || 'asc'
    }
    return this.view.currentResource.find({}, {
      limit: this.view.perPage,
      offset: (this.view.page - 1) * this.view.perPage,
      sort: this.view.sort
    })
  }
}

module.exports = ResourcesController
