const BaseController = require('./base-controller.js')

class ModelsController extends BaseController {
  async index({ params, query, payload }, response) {
    this.findModel(params)
    this.view.instances = await this.findInstances({ query })
    return this.render('pages/list', this.view)
  }

  async show({ params, query, payload }, response) {
    this.findModel(params)
    const { instanceId } = params
    this.view.instance = await this.view.currentModel.findOne(instanceId)
    return this.render('pages/show', this.view)
  }

  async edit({ params, query, payload }, response) {
    this.findModel(params)
    const { instanceId } = params
    this.view.instance = await this.view.currentModel.findOne(instanceId)
    return this.render('pages/edit', this.view)
  }

  async new({ params, query, payload }, response) {
    this.findModel(params)
    this.view.instance = this.view.currentModel.build()
    return this.render('pages/new', this.view)
  }

  async create({ params, query, payload }, response) {
    this.findModel(params)
    this.view.instance = this.view.currentModel.build(payload)
    this.view.instance = await this.view.instance.save()
    if (this.view.instance.isValid()) {
      return response.redirect(this.view.h.showInstanceUrl(
        this.view.currentModel,
        this.view.instance,
      ))
    }
    return this.render('pages/new', this.view)
  }

  async update({ params, query, payload }, response) {
    this.findModel(params)
    const { instanceId } = params
    this.view.instance = await this.view.currentModel.findOne(instanceId)
    await this.view.instance.update(payload)

    if (this.view.instance.isValid()) {
      return response.redirect(this.view.h.showInstanceUrl(
        this.view.database,
        this.view.currentModel,
        this.view.instance,
      ))
    }
    return this.render('pages/edit', this.view)
  }

  async delete({ params, query, payload }, response) {
    this.findModel(params)
    const { instanceId } = params

    await this.view.currentModel.delete(instanceId)
    return response.redirect(this.view.h.listUrl(
      this.view.currentModel,
    ))
  }

  findModel({ modelName }) {
    this.view.currentModel = this._admin.findModel(modelName)
    this.view.properties = this.view.currentModel.properties()
  }

  async findInstances({ query }) {
    this.view.perPage = 10
    this.view.total = await this.view.currentModel.count()
    this.view.page = query.page || 1
    return this.view.currentModel.find({}, {
      limit: this.view.perPage,
      offset: (this.view.page - 1) * this.view.perPage,
    })
  }
}

module.exports = ModelsController
