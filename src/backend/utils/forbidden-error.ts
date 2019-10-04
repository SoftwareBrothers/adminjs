/**
 * Error which is thrown when user
 * doesn't have an access to a given resource/action.
 *
 * @category Errors
 */
class ForbiddenError extends Error {
  /**
   * @param   {object} context
   * @param   {string} context.actionName
   * @param   {string} context.resourceId
   */
  constructor({ actionName, resourceId }) {
    const msg = `
    You cannot perform an action: "${actionName}" on a 
    resource: "${resourceId}"
    `
    super(msg)
    this.message = msg
    this.name = 'ForbiddenError'
  }
}

export default ForbiddenError
