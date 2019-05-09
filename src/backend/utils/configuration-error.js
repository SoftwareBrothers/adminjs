const CONSTANTS = require('../../constants')

const buildUrl = page => (
  `${CONSTANTS.DOCS}/${page}`
)

/**
 * Error which is thrown when user messed up something in the configuration
 *
 * @category Errors
 */
class ConfigurationError extends Error {
  /**
   * @param   {string}  fnName  name of the function, base on which error will
   * print on the output link to the method documentation.
   */
  constructor(message, fnName) {
    const msg = `
    ${message}
    More information can be found at: ${buildUrl(fnName)}
    `
    super(msg)
    this.message = msg
    this.name = 'ConfigurationError'
  }
}

module.exports = ConfigurationError
