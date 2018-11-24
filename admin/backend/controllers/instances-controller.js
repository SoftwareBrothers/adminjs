const BaseController = require('./base-controller.js')

class InstancesController extends BaseController {
  async index({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    this.view.instances = await this.findInstances({ query })
  }

  async show({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    const { instanceId } = params
    this.view.instance = await this.view.model.findOne(instanceId)
  }

  async edit({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    const { instanceId } = params
    this.view.instance = await this.view.model.findOne(instanceId)
  }

  async new({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
  }

  async create({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    this.view.instance = await this.view.model.create(payload)
    return response.redirect(this.view.h.showInstanceUrl(
      this.view.database,
      this.view.model,
      this.view.instance,
    ))
  }

  async update({ params, query, payload }, response) {
    this.findDatabaseAndModel(params)
    const { instanceId } = params
    this.view.instance = await this.view.model.update(instanceId, payload)

    return response.redirect(this.view.h.showInstanceUrl(
      this.view.database,
      this.view.model,
      this.view.instance,
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
