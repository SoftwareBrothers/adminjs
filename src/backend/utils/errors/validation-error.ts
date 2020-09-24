
/**
 * Record Error
 * @alias RecordError
 * @memberof ValidationError
 */
export type RecordError = {
  /**
   * error type (i.e. required)
   */
  type?: string;
  /**
   * human readable message
   */
  message: string;
}

/**
 * Property Errors
 * @alias PropertyErrors
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
   * One root validation error i.e. thrown when user wants to perform
   * an action which violates foreign key constraint
   */
  public baseError: RecordError | null

  /**
   * HTTP Status code: 400
   */
  public statusCode: number

  /**
   * @param {PropertyErrors} propertyErrors     error messages
   * @param {RecordError} [baseError]           base error message
   */
  constructor(propertyErrors: PropertyErrors, baseError?: RecordError) {
    super('Resource cannot be stored because of validation errors')
    this.statusCode = 400
    this.propertyErrors = propertyErrors
    this.baseError = baseError || null
    this.name = 'ValidationError'
  }
}

export default ValidationError
