type ErrorMessage = {
  message: string;
  kind: string;
}

/**
 * Error which is thrown when there are validation errors with records
 * @category Errors
 */
class ValidationError extends Error {
  public errors

  /**
   * @param  {String} message   custom message
   * @param  {Object} errors    error messages
   * @param  {String} errors.{...}    error for particular field where ... is a
   *                                  {@link BaseProperty#path}
   * @param  {String} errors.{...}.message   human readible message
   * @param  {String} errors.{...}.kind      string type (i.e. required)
   */
  constructor(message: string, errors: {[key: string]: ErrorMessage}) {
    super(message)
    this.errors = errors
    this.message = message || 'Resource cannot be stored because of validation errors'
    this.name = 'ValidationError'
  }
}

export default ValidationError
