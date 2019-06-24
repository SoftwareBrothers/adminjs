/**
 * @implements Action
 * @category Actions
 * @module EditAction
 * @description
 * Shows form for updating existing record
 *
 * Uses {@link EditAction} component to render form
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
  name: 'edit',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-edit',
  label: 'Edit',
  /**
   * Responsible for updating existing record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {module:EditAction~ApiResponse}  populated record
   * @implements Action.handler
   */
  handler: async (request, response, data) => {
    const { record } = data
    if (request.method === 'get') {
      return { record: record.toJSON() }
    }
    if (request.method === 'post') {
      await record.update(request.payload.record)
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
    return ''
  },
}
