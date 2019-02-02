/**
 * Error which is thrown when there are validation errors with records
 * @category Errors
 */
class ValidationError extends Error {
  /**
   * @param  {String} message   custom message
   * @param  {Object} errors    error messages
   * @param  {String} errors.attributePath    error for particular field
   * @param  {String} errors.attributePath.message   human readible message
   * @param  {String} errors.attributePath.kind      string type (i.e. required)
   */
  constructor(message, errors) {
    super(message)
    this.errors = errors
    this.message = message || 'Resource cannot be stored because of validation errors'
    this.name = 'ValidationError'
  }
}

module.exports = ValidationError
