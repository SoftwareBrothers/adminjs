const NotImplementedError = require('../../utils/not-implemented-error')

/**
 * Representation of a ORM Model Instance (document, record) in AdminBro
 */
class AbstractInstance {
  /**
   * @param  {Object} params object of all parameters received from database
   * @param  {AbstractModel} model  implementation of a model which type is given instance
   */
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
