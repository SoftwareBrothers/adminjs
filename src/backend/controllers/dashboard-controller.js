const BaseController = require('./base-controller.js')

class DashboardController extends BaseController {
  index({params, query, payload}, response) {
    return this.render('pages/dashboard', this.view)
  }
}

module.exports = DashboardController
