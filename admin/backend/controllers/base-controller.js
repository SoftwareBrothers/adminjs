const ViewHelpers = require('../utils/view-helpers')

class BaseController {
  constructor({ admin }) {
    this._admin = admin
    this.view = {}
    this.view.databases = admin.databases
    this.view.h = new ViewHelpers({ admin })
  }
}

module.exports = BaseController
