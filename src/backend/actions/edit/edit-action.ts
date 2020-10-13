import { Action, RecordActionResponse } from '../action.interface'
import NotFoundError from '../../utils/errors/not-found-error'
import populator from '../../utils/populator/populator'

/**
 * @implements Action
 * @category Actions
 * @module EditAction
 * @description
 * Shows form for updating existing record
 * @private
 *
 * @classdesc
 * Uses {@link EditAction} component to render form
 */
export const EditAction: Action<RecordActionResponse> = {
  name: 'edit',
  isVisible: true,
  actionType: 'record',
  icon: 'Edit',
  showInDrawer: false,
  /**
   * Responsible for updating existing record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {RecordActionResponse}  populated record
   * @implements Action#handler
   * @memberof module:EditAction
   */
  handler: async (request, response, context) => {
    const { record, resource, currentAdmin, h, translateMessage } = context
    if (!record) {
      throw new NotFoundError([
        `Record of given id ("${request.params.recordId}") could not be found`,
      ].join('\n'), 'Action#handler')
    }
    if (request.method === 'get') {
      return { record: record.toJSON(currentAdmin) }
    }

    const newRecord = await record.update(request.payload)
    const [populatedRecord] = await populator([newRecord])

    // eslint-disable-next-line no-param-reassign
    context.record = populatedRecord

    if (record.isValid()) {
      return {
        redirectUrl: h.resourceUrl({ resourceId: resource._decorated?.id() || resource.id() }),
        notice: {
          message: translateMessage('successfullyUpdated', resource.id()),
          type: 'success',
        },
        record: populatedRecord.toJSON(currentAdmin),
      }
    }
    return {
      record: populatedRecord.toJSON(currentAdmin),
      notice: {
        message: translateMessage('thereWereValidationErrors'),
        type: 'error',
      },
    }
  },
}

export default EditAction
