const BaseController = require('./base-controller.js')

class ResourcesController extends BaseController {
  async index({ params, query, payload }, response) {
    this.findResources(params)
    this.view.instances = await this.findInstances({ query })
    return this.render('pages/list', this.view)
  }

  async show({ params, query, payload }, response) {
    this.findResources(params)
    const { instanceId } = params
    this.view.instance = await this.view.currentResource.findOne(instanceId)
    return this.render('pages/show', this.view)
  }

  async edit({ params, query, payload }, response) {
    this.findResources(params)
    const { instanceId } = params
    this.view.instance = await this.view.currentResource.findOne(instanceId)
    return this.render('pages/edit', this.view)
  }

  async new({ params, query, payload }, response) {
    this.findResources(params)
    this.view.instance = this.view.currentResource.build()
    return this.render('pages/new', this.view)
  }

  async create({ params, query, payload }, response) {
    this.findResources(params)
    this.view.instance = this.view.currentResource.build(payload)
    this.view.instance = await this.view.instance.save()
    if (this.view.instance.isValid()) {
      return response.redirect(this.view.h.showInstanceUrl(
        this.view.currentResource,
        this.view.instance,
      ))
    }
    return this.render('pages/new', this.view)
  }

  async update({ params, query, payload }, response) {
    this.findResources(params)
    const { instanceId } = params
    this.view.instance = await this.view.currentResource.findOne(instanceId)
    await this.view.instance.update(payload)

    if (this.view.instance.isValid()) {
      return response.redirect(this.view.h.showInstanceUrl(
        this.view.currentResource,
        this.view.instance,
      ))
    }
    return this.render('pages/edit', this.view)
  }

  async delete({ params, query, payload }, response) {
    this.findResources(params)
    const { instanceId } = params

    await this.view.currentResource.delete(instanceId)
    return response.redirect(this.view.h.listUrl(
      this.view.currentResource,
    ))
  }

  findResources({ resourceName }) {
    this.view.currentResource = this._admin.findResource(resourceName)
    this.view.properties = this.view.currentResource.properties()
  }

  async findInstances({ query }) {
    this.view.perPage = 10
    this.view.total = await this.view.currentResource.count()
    this.view.page = query.page || 1
    return this.view.currentResource.find({}, {
      limit: this.view.perPage,
      offset: (this.view.page - 1) * this.view.perPage,
    })
  }
}

module.exports = ResourcesController
