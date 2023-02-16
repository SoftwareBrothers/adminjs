import { populator } from '../../utils/populator/index.js'
import { paramConverter } from '../../../utils/param-converter/index.js'
import { Action, RecordActionResponse } from '../action.interface.js'

/**
 * @implements Action
 * @category Actions
 * @module NewAction
 * @description
 * Shows form for creating a new record
 * Uses {@link NewAction} component to render form
 * @private
 */
export const NewAction: Action<RecordActionResponse> = {
  name: 'new',
  isVisible: true,
  actionType: 'resource',
  icon: 'Plus',
  showInDrawer: false,
  variant: 'primary',
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
    const { resource, h, currentAdmin } = context
    if (request.method === 'post') {
      const params = paramConverter.prepareParams(request.payload ?? {}, resource)

      let record = await resource.build(params)

      record = await record.create(context)
      const [populatedRecord] = await populator([record], context)

      // eslint-disable-next-line no-param-reassign
      context.record = populatedRecord

      if (record.isValid()) {
        return {
          redirectUrl: h.resourceUrl({ resourceId: resource._decorated?.id() || resource.id() }),
          notice: {
            message: 'successfullyCreated',
            type: 'success',
          },
          record: record.toJSON(currentAdmin),
        }
      }
      const baseMessage = populatedRecord.baseError?.message
        || 'thereWereValidationErrors'
      return {
        record: record.toJSON(currentAdmin),
        notice: {
          message: baseMessage,
          type: 'error',
        },
      }
    }
    // TODO: add wrong implementation error
    throw new Error('new action can be invoked only via `post` http method')
  },
}

export default NewAction
