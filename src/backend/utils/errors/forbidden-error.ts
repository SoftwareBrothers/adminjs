import { ErrorTypeEnum } from '../../../utils/error-type.enum.js'
import RecordError from './record-error.js'

/**
 * Error which is thrown when user
 * doesn't have an access to a given resource/action.
 *
 * @category Errors
 */
export class ForbiddenError extends Error {
  /**
   * HTTP Status code: 403
   */
  public statusCode: number

  /**
   * Base error message and type which is stored in the record
   */
  public baseError: RecordError

  /**
   * Any custom message which should be seen in the UI
   */
  public baseMessage?: string

  /**
   * @param {string} [message]
   */
  constructor(message?: string) {
    const defaultMessage = 'You cannot perform this action'
    super(defaultMessage)
    this.statusCode = 403
    this.baseMessage = message
    this.baseError = {
      message: message ?? defaultMessage,
      type: ErrorTypeEnum.Forbidden,
    }
    this.name = ErrorTypeEnum.Forbidden
  }
}

export default ForbiddenError
