/**
 * @implements Action
 * @category Actions
 * @module DeleteAction
 * @description
 * Removes given record from the database. Since it doesn't have a
 * component - it redirects right away after clicking its {@link ActionButton}
 */

/**
 * @typedef {Object} ApiResponse
 * @property {String} redirectUrl in case of success it fills this filed
 *                                          to indicate that there should be
 *                                          redirect after the action.
 */

module.exports = {
  name: 'delete',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-remove-2',
  label: 'Remove',
  guard: 'Do you really want to remove this item?',
  component: false,
  /**
   * Responsible for deleting existing record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {module:DeleteAction~ApiResponse} redirect
   * @implements Action.handler
   */
  handler: async (request, response, data) => {
    await data.resource.delete(request.params.recordId)
    return {
      redirectUrl: data.h.resourceActionUrl({ resourceId: data.resource.id(), actionName: 'list' }),
    }
  },
}
