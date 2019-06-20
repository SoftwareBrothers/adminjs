/* eslint-disable no-unused-vars */
const layoutTemplate = require('../../frontend/layout-template')
const componentsBundler = require('../bundler/user-components-bundler')
const ViewHelpers = require('../utils/view-helpers')

class AppController {
  constructor({ admin }, currentAdmin) {
    this._admin = admin
    this.h = new ViewHelpers(admin)
    this.currentAdmin = currentAdmin
  }

  async index({ params, query, payload }, response) {
    return layoutTemplate(this._admin, this.currentAdmin, '')
  }

  async resource({ params, query, payload }, response) {
    return layoutTemplate(this._admin, this.currentAdmin, '/')
  }

  async resourceAction({ params, query, payload }, response) {
    const { resourceId, actionName } = params
    const href = this.h.resourceActionUrl({ resourceId, actionName })
    return layoutTemplate(this._admin, this.currentAdmin, href)
  }

  async recordAction({ params, query, payload }, response) {
    const { resourceId, actionName, recordId } = params
    const href = this.h.recordActionUrl({ resourceId, actionName, recordId })
    return layoutTemplate(this._admin, this.currentAdmin, href)
  }

  async bundleComponents({ params, query, payload }, response) {
    return componentsBundler(this._admin)
  }
}

module.exports = AppController
