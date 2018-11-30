const BaseDecorator = require('../../backend/utils/base-decorator')
const AdminModel = require('../mongoose/admin-model')

class AdminModelDecorator extends BaseDecorator {
  constructor() {
    super(AdminModel)
  }

  static title(){

  }
}

module.exports = AdminModelDecorator
