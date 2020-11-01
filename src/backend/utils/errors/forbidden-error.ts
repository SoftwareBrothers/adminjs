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
   * Any custom message which should be seen in the UI
   */
  public baseMessage?: string

  /**
   * @param {string} [message]
   */
  constructor(message?: string) {
    super('You cannot perform this action')
    this.statusCode = 403
    this.baseMessage = message
    this.name = 'ForbiddenError'
  }
}

export default ForbiddenError
