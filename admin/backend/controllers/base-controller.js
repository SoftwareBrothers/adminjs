const ViewHelpers = require('../utils/view-helpers')

/**
 * base class for all controllers in the application
 * It initializes this.view with databases and it load helpers
 * Also it stores this._admin (instance of {@link Admin}) locally
 *
 * @namespace Controllers
 */
class BaseController {
  /**
   * @param  {Object} options
   * @param  {Admin} options.admin
   */
  constructor({ admin }) {
    this._admin = admin
    this.view = {}
    this.view.databases = admin.databases
    this.view.h = new ViewHelpers({ admin })
  }
}

module.exports = BaseController
