const { BaseDecorator } = require('../../index')
const AdminModel = require('../mongoose/admin-model')

class AdminDecorator extends BaseDecorator {
  constructor() {
    super(AdminModel)
  }
}

module.exports = AdminDecorator
