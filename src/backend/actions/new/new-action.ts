import { populator } from '../../utils'
import { Action, RecordActionResponse } from '../action.interface'
import { paramConverter } from '../../../utils/param-converter'

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
  icon: 'Add',
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
    const { resource, h, currentAdmin, translateMessage } = context
    if (request.method === 'post') {
      const params = paramConverter.prepareParams(request.payload ?? {}, resource)

      let record = await resource.build(params)

      record = await record.create()
      const [populatedRecord] = await populator([record])

      // eslint-disable-next-line no-param-reassign
      context.record = populatedRecord


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
      const baseMessage = populatedRecord.baseError?.message
        || translateMessage('thereWereValidationErrors', resource.id())
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
