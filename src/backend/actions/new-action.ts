import Action, { RecordActionResponse } from './action.interface'

/**
 * @implements Action
 * @category Actions
 * @module NewAction
 * @description
 * Shows form for creating a new record
 * Uses {@link NewAction} component to render form
 */
const NewAction: Action<RecordActionResponse> = {
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
   * @implements Action#handler
   * @memberof module:NewAction
   * @return {Promise<RecordActionResponse>} populated records
   */
  handler: async (request, response, context) => {
    if (request.method === 'post') {
      let record = await context.resource.build(request.payload ? request.payload : {})
      record = await record.save()

      // eslint-disable-next-line no-param-reassign
      context.record = record

      if (record.isValid()) {
        return {
          redirectUrl: context.h.recordActionUrl({
            resourceId: context.resource.id(), recordId: record.id(), actionName: 'show',
          }),
          notice: {
            message: 'Successfully created a new record',
            type: 'success',
          },
          record: record.toJSON(context.currentAdmin),
        }
      }
      return {
        record: record.toJSON(context.currentAdmin),
        notice: {
          message: 'There are validation errors - check them out below.',
          type: 'error',
        },
      }
    }
    // TODO: add wrong implementation error
    throw new Error('new action can be invoked only via `post` http method')
  },
}

export default NewAction
