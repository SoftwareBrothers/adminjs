const BaseController = require('./base-controller.js')
const ValidationError = require('../utils/validation-error.js')

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
    this.view.instance = this.view.model.build()
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
    return null
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
    return null
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
