/* eslint-disable no-unused-vars */
const BaseController = require('./base-controller.js')

class DashboardController extends BaseController {
  async index({ params, query, payload }, response) {
    // eslint-disable-next-line new-cap
    const dashboard = this._admin.dashboardPage && new this._admin.dashboardPage(this._admin)
    if (dashboard) {
      this.data.customDashboard = await dashboard.render()
    }
    return this.render('pages/dashboard', this.data)
  }
}

module.exports = DashboardController
