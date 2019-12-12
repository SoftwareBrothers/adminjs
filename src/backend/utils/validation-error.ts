
/**
 * Record Error
 * @memberof ValidationError
 */
export type RecordError = {
  /**
   * error type (i.e. required)
   */
  type: string;
  /**
   * human readible message
   */
  message: string;
}

/**
 * Property Errors
 * @memberof ValidationError
 */
export type PropertyErrors = {
  [key: string]: RecordError;
}

/**
 * Error which is thrown when there are validation errors with records
 * @category Errors
 */
class ValidationError extends Error {
  /**
   * Validation errors for all properties
   */
  public propertyErrors: PropertyErrors

  /**
   * One root validatin error i.e. thrown when user wants to perform
   * an action which violates foreign key constraint
   */
  public baseError: RecordError | null

  /**
   * @param {string} message   custom message
   * @param {PropertyErrors} propertyErrors     error messages
   * @param {RecordError} [baseError]           base error
   */
  constructor(message: string, propertyErrors: PropertyErrors, baseError?: RecordError) {
    super(message)
    this.propertyErrors = propertyErrors
    this.baseError = baseError || null
    this.message = message || 'Resource cannot be stored because of validation errors'
    this.name = 'ValidationError'
  }
}

export default ValidationError
