/* eslint-disable no-unused-vars */
const BaseController = require('./base-controller.js')

class DashboardController extends BaseController {
  async index({ params, query, payload }, response) {
    const dashboard = this._admin.DashboardPage && new this._admin.DashboardPage(this._admin)
    if (dashboard) {
      this.data.customDashboard = await dashboard.render()
    }
    return this.render('pages/dashboard', this.data)
  }
}

module.exports = DashboardController
