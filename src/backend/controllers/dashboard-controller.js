const BaseController = require('./base-controller.js')

class DashboardController extends BaseController {
  // eslint-disable-next-line no-unused-vars
  async index({ params, query, payload }, response) {
    const dashboard = this._admin.DashboardPage && new this._admin.DashboardPage(this._admin)
    if (dashboard) {
      this.data.customDashboard = await dashboard.build()
    }
    return this.render('pages/dashboard', this.data)
  }
}

module.exports = DashboardController
