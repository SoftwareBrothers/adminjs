const ViewHelpers = require('../utils/view-helpers')
const Renderer = require('../utils/renderer')

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
  constructor({ admin }, currentAdmin) {
    this._admin = admin
    this.view = {}
    this.view.currentAdmin = currentAdmin
    this.view.databases = admin.databases
    this.view.h = new ViewHelpers({ admin })
  }

  /**
   * Renders given view with the data provided
   * @param  {String} view  path to the pug view (i.e. pages/list)
   * @param  {Object} data  which will be send to the view
   * @return {String}       rendered html
   */
  render(view, data) {
    return new Renderer(view, data).render()
  }
}

module.exports = BaseController
