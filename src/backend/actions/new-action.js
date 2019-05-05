/**
 * @implements Action
 * @category Actions
 * @module NewAction
 * @description
 * Shows form for creating a new record
 * Uses {@link NewAction} component to render form
 */

/**
 * @typedef {Object} ApiResponse
 * @property {BaseRecord~JSON} record     populated record, along with errors
 *                                        (if any).
 * @property {BaseRecord~JSON} [redirectUrl] in case of success it fills this filed
 *                                          to indicate that there should be
 *                                          redirect after the action.
 */

module.exports = {
  name: 'new',
  isVisible: true,
  actionType: 'resource',
  icon: 'icomoon-add',
  label: 'Add new',
  /**
   * Responsible for creating new record.
   *
   * To invoke this action use {@link ApiClient#resourceAction}
   *
   * @return  {module:NewAction~ApiResponse}  populated record
   * @implements Action.handler
   */
  handler: async (request, response, data) => {
    if (request.method === 'post') {
      let record = await data.resource.build(request.payload.record)
      record = await record.save()
      if (record.isValid()) {
        return {
          redirectUrl: data.h.recordActionUrl({
            resourceId: data.resource.id(), recordId: record.id(), actionName: 'show',
          }),
          record: record.toJSON(),
        }
      }
      return { record: record.toJSON() }
    }
    return {}
  },
}
