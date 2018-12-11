const ViewHelpers = require('../utils/view-helpers')
const Renderer = require('../utils/renderer')

/**
 * base class for all controllers in the application
 * It initializes this.data with databases and it load helpers
 * Also it stores this._admin (instance of {@link Admin}) locally
 *
 * @namespace Controllers
 */
class BaseController {
  /**
   * @param  {Object} options
   * @param  {AdminBro} options.admin
   * @param  {Object} currentAdmin          logged in admin
   * @param  {Object} currentAdmin.email
   */
  constructor({ admin }, currentAdmin) {
    this._admin = admin
    this.data = {}
    this.data.currentAdmin = currentAdmin
    this.data.resources = admin.resources.reduce((memo, resource) => {
      const parent = resource.decorate().getParent()
      const parentName = parent.name
      if (memo[parentName]) {
        memo[parentName].push(resource)
      } else {
        memo[parentName] = [resource]
      }
      memo[parentName].icon = parent.icon
      return memo
    }, {})
    this.data.h = new ViewHelpers({ admin })
  }

  /**
   * Renders given view with the data provided
   * @param  {String} view  path to the pug view (i.e. pages/list)
   * @param  {Object} data  which will be send to the view as an data context
   * @return {String}       rendered html
   */
  render(view, data) {
    return new Renderer(view, data).render()
  }
}

module.exports = BaseController
