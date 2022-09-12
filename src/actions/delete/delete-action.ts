import { NotFoundError, ValidationError } from '@adminjs/common/errors'

import { Action, RecordActionResponse } from '../action.interface'

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
  icon: 'TrashCan',
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
  handler: async (request, response, data) => {
    const { record, resource, currentAdmin } = data
    if (!request.params.recordId || !record) {
      throw new NotFoundError([
        'You have to pass "recordId" to Delete Action',
      ].join('\n'), 'Action#handler')
    }
    try {
      await resource.delete(request.params.recordId)
    } catch (error) {
      if (error instanceof ValidationError) {
        const baseMessage = error.baseError?.message ?? 'thereWereValidationErrors'
        return {
          record: record.toJSON(currentAdmin),
          notice: {
            message: baseMessage,
            resourceId: resource._decorated?.id?.() || resource.id(),
            type: 'error',
          },
        }
      }
      throw error
    }
    return {
      record: record.toJSON(currentAdmin),
      notice: {
        message: 'successfullyDeleted',
        resourceId: resource._decorated?.id?.() || resource.id(),
        type: 'success',
      },
    }
  },
}

export default DeleteAction
