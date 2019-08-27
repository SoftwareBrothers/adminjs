/**
 * Error which is thrown when user
 * doesn't have an access to a given resource/action.
 *
 * @category Errors
 */
class ForbiddenError extends Error {
  /**
   * @param   {Object} context
   * @param   {String} context.actionName
   * @param   {String} context.resourceId
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

module.exports = ForbiddenError
