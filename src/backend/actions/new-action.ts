import Action, { RecordActionResponse } from './action.interface'

/**
 * @implements Action
 * @category Actions
 * @module NewAction
 * @description
 * Shows form for creating a new record
 * Uses {@link NewAction} component to render form
 * @private
 */
const NewAction: Action<RecordActionResponse> = {
  name: 'new',
  isVisible: true,
  actionType: 'resource',
  icon: 'Add',
  showInDrawer: false,
  /**
   * Responsible for creating new record.
   *
   * To invoke this action use {@link ApiClient#resourceAction}
   *
   * @implements Action#handler
   * @memberof module:NewAction
   * @return {Promise<RecordActionResponse>} populated records
   */
  handler: async (request, response, context) => {
    const { resource, h, currentAdmin, translateMessage } = context
    if (request.method === 'post') {
      let record = await resource.build(request.payload ? request.payload : {})
      record = await record.save()

      // eslint-disable-next-line no-param-reassign
      context.record = record

      if (record.isValid()) {
        return {
          redirectUrl: h.resourceUrl({ resourceId: resource._decorated?.id() || resource.id() }),
          notice: {
            message: translateMessage('successfullyCreated', resource.id()),
            type: 'success',
          },
          record: record.toJSON(currentAdmin),
        }
      }
      return {
        record: record.toJSON(currentAdmin),
        notice: {
          message: translateMessage('thereWereValidationErrors', resource.id()),
          type: 'error',
        },
      }
    }
    // TODO: add wrong implementation error
    throw new Error('new action can be invoked only via `post` http method')
  },
}

export default NewAction
