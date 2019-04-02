const ViewHelpers = require('../utils/view-helpers')
const Renderer = require('../utils/renderer')

/**
 * base class for all controllers in the application
 * It initializes this.data with databases and it load helpers
 * Also it stores this._admin (instance of {@link Admin}) locally
 * @private
 */
class BaseController {
  /**
   * @param  {Object} options
   * @param  {AdminBro} options.admin
   * @param  {Object} currentAdmin          logged in admin
   * @param  {string} currentAdmin.email
   */
  constructor({ admin }, currentAdmin) {
    this._admin = admin
    this.data = {}
    this.currentAdmin = currentAdmin
  }
}

module.exports = BaseController
