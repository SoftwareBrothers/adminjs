const BaseController = require('./base-controller.js')
// const PageBuilder = require('../adapters/base-page')

class DashboardController extends BaseController {
  // eslint-disable-next-line no-unused-vars
  async index({ params, query, payload }, response) {
    // eslint-disable-next-line new-cap
    const dashboard = new this._admin.dashboardPage()
    this.data.dashboardContent = await dashboard.build()
    return this.render('pages/dashboard', this.data)
  }
}

module.exports = DashboardController
