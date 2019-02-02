const CONSTANTS = require('../../constants')

const buildUrl = (fnName) => {
  if (fnName) {
    let obj
    let fn
    if (fnName.indexOf('.') > 0) {
      [obj, fn] = fnName.split('.')
      fn = `.${fn}`
    } else {
      [obj, fn] = fnName.split('#')
    }
    return `${CONSTANTS.DOCS}/${obj}.html#${fn}`
  }
  return CONSTANTS.DOCS
}

/**
 * Error which is thrown when an abstract method is not implemented
 *
 * @category Errors
 */
class NotImplementedError extends Error {
  /**
   * @param   {string}  fnName  name of the function, base on which error will
   * print on the output link to the method documentation.
   */
  constructor(fnName) {
    const message = `
    You have to implement the method: ${fnName}
    Check out the documentation at: ${buildUrl(fnName)}
    `
    super(message)
    this.message = message
  }
}

module.exports = NotImplementedError
