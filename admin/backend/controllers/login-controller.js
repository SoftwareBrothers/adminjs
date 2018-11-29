const BaseController = require('./base-controller.js')

class LoginController extends BaseController {
  show({params, query, payload}, response) {
    
  }

  async create(request, response) {
    const isAuthenticated = await this._admin.authenticateAdmin(request, response)
    console.log('isAuthenticated', isAuthenticated)
  }
}

module.exports = LoginController
