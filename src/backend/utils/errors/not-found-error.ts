import { ErrorTypeEnum } from '../../../utils/error-type.enum.js'
import * as CONSTANTS from '../../../constants.js'
import RecordError from './record-error.js'

const buildUrl = (page: string): string => (
  `${CONSTANTS.DOCS}/${page}`
)

/**
 * Error which is thrown when given record/resource/action hasn't been found.
 *
 * @category Errors
 */
export class NotFoundError extends Error {
  /**
   * HTTP Status code: 404
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
   * @param   {string}  fnName  name of the function, base on which error will
   * print on the output link to the method documentation.
   * @param {string} message
   */
  constructor(message, fnName) {
    const msg = `
    ${message}
    More information can be found at: ${buildUrl(fnName)}
    `
    super(msg)
    this.statusCode = 404
    this.baseMessage = message
    this.baseError = {
      message,
      type: ErrorTypeEnum.NotFound,
    }
    this.message = msg
    this.name = ErrorTypeEnum.NotFound
  }
}

export default NotFoundError
