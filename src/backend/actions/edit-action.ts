import Action, { RecordActionResponse } from './action.interface'
import NotFoundError from '../utils/not-found-error'

/**
 * @implements Action
 * @category Actions
 * @module EditAction
 * @description
 * Shows form for updating existing record
 * @private
 *
 * Uses {@link EditAction} component to render form
 */
const EditAction: Action<RecordActionResponse> = {
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
  handler: async (request, response, data) => {
    const { record, resource, currentAdmin, h, translateMessage } = data
    if (!record) {
      throw new NotFoundError([
        `Record of given id ("${request.params.recordId}") could not be found`,
      ].join('\n'), 'Action#handler')
    }
    if (request.method === 'get') {
      return { record: record.toJSON(currentAdmin) }
    }
    await record.update(request.payload)
    if (record.isValid()) {
      return {
        redirectUrl: h.resourceUrl({ resourceId: resource._decorated?.id() || resource.id() }),
        notice: {
          message: translateMessage('successfullyUpdated', resource.id()),
          type: 'success',
        },
        record: record.toJSON(currentAdmin),
      }
    }
    return {
      record: record.toJSON(currentAdmin),
      notice: {
        message: translateMessage('thereWereValidationErrors'),
        type: 'error',
      },
    }
  },
}

export default EditAction
