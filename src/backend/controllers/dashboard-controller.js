const BaseController = require('./base-controller.js')

const layoutTemplate = require('../../frontend/views/layout-template')
const bundler = require('../utils/bundler')
const ViewHelpers = require('../utils/view-helpers')

class DashboardController extends BaseController {
  constructor(...params) {
    super(...params)
    this.h = new ViewHelpers(this._admin)
  }

  async index({ params, query, payload }, response) {
    return layoutTemplate(this._admin, this.currentAdmin, '')
  }

  async resource({ params, query, payload }, response) {
    return layoutTemplate(this._admin, this.currentAdmin, '/')
  }

  async resourceAction({ params, query, payload }, response) {
    return layoutTemplate(this._admin, this.currentAdmin, this.h.resourceActionUrl(params.resourceId, params.actionName))
  }

  async recordAction({ params, query, payload }, response) {
    return layoutTemplate(this._admin, this.currentAdmin, this.h.recordActionUrl(params.resourceId, params.actionName, params.recordId))
  }

  async bundle({ params, query, payload }, response) {
    return bundler()
  }
}

module.exports = DashboardController
