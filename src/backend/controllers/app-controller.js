const layoutTemplate = require('../../frontend/layout-template')
const appBundler = require('../bundler/app-bundler')
const componentsBundler = require('../bundler/components-bundler')

class AppController {
  constructor({ admin }, currentAdmin) {
    this._admin = admin
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
    return layoutTemplate(this._admin, this.currentAdmin, this.h.resourceActionUrl({ resourceId, actionName }))
  }

  async recordAction({ params, query, payload }, response) {
    const { resourceId, actionName, recordId } = params
    return layoutTemplate(this._admin, this.currentAdmin, this.h.recordActionUrl({ resourceId, actionName, recordId }))
  }

  async bundle({ params, query, payload }, response) {
    return appBundler()
  }

  async bundleComponents({ params, query, payload }, response) {
    return componentsBundler(this._admin)
  }
}

module.exports = AppController
