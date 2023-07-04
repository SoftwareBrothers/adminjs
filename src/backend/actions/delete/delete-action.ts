import { Action, RecordActionResponse } from '../action.interface.js'
import NotFoundError from '../../utils/errors/not-found-error.js'
import ValidationError from '../../utils/errors/validation-error.js'

/**
 * @implements Action
 * @category Actions
 * @module DeleteAction
 * @description
 * Removes given record from the database. Since it doesn't have a
 * component - it redirects right away after clicking its {@link ActionButton}
 * @private
 */
export const DeleteAction: Action<RecordActionResponse> = {
  name: 'delete',
  isVisible: true,
  actionType: 'record',
  icon: 'Trash2',
  guard: 'confirmDelete',
  component: false,
  variant: 'danger',
  /**
   * Responsible for deleting existing record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {Promise<RecordActionResponse>}
   * @implements ActionHandler
   * @memberof module:DeleteAction
   */
  handler: async (request, _response, context) => {
    const { record, resource, currentAdmin, h } = context

    if (!request.params.recordId || !record) {
      throw new NotFoundError([
        'You have to pass "recordId" to Delete Action',
      ].join('\n'), 'Action#handler')
    }

    if (request.method === 'get') {
      return {
        record: record.toJSON(context.currentAdmin),
      }
    }

    try {
      await resource.delete(request.params.recordId, context)
    } catch (error) {
      if (error instanceof ValidationError) {
        const baseMessage = error.baseError?.message
          || 'thereWereValidationErrors'
        return {
          record: record.toJSON(currentAdmin),
          notice: {
            message: baseMessage,
            type: 'error',
          },
        }
      }
      throw error
    }

    return {
      record: record.toJSON(currentAdmin),
      redirectUrl: h.resourceUrl({ resourceId: resource._decorated?.id() || resource.id() }),
      notice: {
        message: 'successfullyDeleted',
        type: 'success',
      },
    }
  },
}

export default DeleteAction
