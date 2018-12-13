const CONSTANTS = require('../../constants')

class NotImplementedError extends Error {
  constructor(fnName) {
    const message = `
    You have to implement the method: ${fnName}
    Check out the documentation at: ${buildUrl(fnName)}
    `
    super(message)
    this.message = message
  }
}

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

module.exports = NotImplementedError
