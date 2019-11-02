import { RecordError } from '../adapters/base-record'

/**
 * Error which is thrown when there are validation errors with records
 * @category Errors
 */
class ValidationError extends Error {
  public errors: {[key: string]: RecordError}

  /**
   * @param  {String} message   custom message
   * @param  {Object} errors    error messages
   * @param  {String} errors.{...}    error for particular field where ... is a
   *                                  {@link BaseProperty#path}
   * @param  {String} errors.{...}.message   human readible message
   * @param  {String} errors.{...}.type      string type (i.e. required)
   */
  constructor(message: string, errors: {[key: string]: RecordError}) {
    super(message)
    this.errors = errors
    this.message = message || 'Resource cannot be stored because of validation errors'
    this.name = 'ValidationError'
  }
}

export default ValidationError
