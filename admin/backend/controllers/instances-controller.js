const BaseController = require('./base-controller.js')

class InstancesController extends BaseController {
  async index({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    this.view.currentModel = params.modelName
    this.view.instances = await this.findInstances({ query })
    return this.render('pages/list', this.view)
  }

  async show({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    const { instanceId } = params
    this.view.currentModel = params.modelName
    this.view.instance = await this.view.model.findOne(instanceId)
    return this.render('pages/show', this.view)
  }

  async edit({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    const { instanceId } = params
    this.view.currentModel = params.modelName
    this.view.instance = await this.view.model.findOne(instanceId)
    return this.render('pages/edit', this.view)
  }

  async new({ params, query, payload }, response) {
    this.view.currentModel = params.modelName
    this.findDatabaseAndModel(params)
    this.view.instance = this.view.model.build()
    return this.render('pages/new', this.view)
  }

  async create({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    this.view.instance = this.view.model.build(payload)
    this.view.instance = await this.view.instance.save()
    if (this.view.instance.isValid()) {
      return response.redirect(this.view.h.showInstanceUrl(
        this.view.database,
        this.view.model,
        this.view.instance,
      ))
    }
    return this.render('pages/new', this.view)
  }

  async update({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    const { instanceId } = params
    this.view.instance = await this.view.model.findOne(instanceId)
    await this.view.instance.update(payload)

    if (this.view.instance.isValid()) {
      return response.redirect(this.view.h.showInstanceUrl(
        this.view.database,
        this.view.model,
        this.view.instance,
      ))
    }
    return this.render('pages/edit', this.view)
  }

  async delete({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    const { instanceId } = params

    await this.view.model.delete(instanceId)
    return response.redirect(this.view.h.listUrl(
      this.view.database,
      this.view.model,
    ))
  }

  findDatabaseAndModel({ databaseName, modelName }) {
    this.view.database = this._admin.database(databaseName)
    this.view.model = this.view.database.find(modelName)
    this.view.properties = this.view.model.properties()
  }

  async findInstances({ query }) {
    this.view.perPage = 10
    this.view.total = await this.view.model.count()
    this.view.page = query.page || 1
    return this.view.model.find({}, {
      limit: this.view.perPage,
      offset: (this.view.page - 1) * this.view.perPage,
    })
  }
}

module.exports = InstancesController
