/* eslint-disable no-unused-vars */
import ViewHelpers from '../utils/view-helpers'
import componentsBundler from '../bundler/user-components-bundler'

const layoutTemplate = require('../../frontend/layout-template')

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
