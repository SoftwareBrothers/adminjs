const NotImplementedError = require('../../utils/not-implemented-error')

/**
 * Representation of a ORM Model Instance (document, record) in AdminBro
 */
class AbstractInstance {
  constructor(params, model) {
    this.model = model
    this.params = params
  }

  param(paramName) {
    throw new NotImplementedError()
  }

  id() {
    throw new NotImplementedError()
  }
}

module.exports = AbstractInstance
