import Action, { RecordActionResponse } from './action.interface'
import NotFoundError from '../utils/not-found-error'
import ValidationError from '../utils/validation-error'

/**
 * @implements Action
 * @category Actions
 * @module DeleteAction
 * @description
 * Removes given record from the database. Since it doesn't have a
 * component - it redirects right away after clicking its {@link ActionButton}
 */
const DeleteAction: Action<RecordActionResponse> = {
  name: 'delete',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-remove-2',
  label: 'Remove',
  guard: 'Do you really want to remove this item?',
  component: false,
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
    if (!request.params.recordId || !data.record) {
      throw new NotFoundError([
        'You have to pass "recordId" to Delete Action',
      ].join('\n'), 'Action#handler')
    }
    try {
      await data.resource.delete(request.params.recordId)
    } catch (error) {
      if (error instanceof ValidationError && error.baseError) {
        return {
          record: data.record.toJSON(data.currentAdmin),
          notice: {
            message: error.baseError.message,
            type: 'error',
          },
        }
      }
      throw error
    }
    return {
      record: data.record.toJSON(data.currentAdmin),
      redirectUrl: data.h.resourceActionUrl({ resourceId: data.resource.id(), actionName: 'list' }),
      notice: {
        message: 'Successfully removed given record',
        type: 'success',
      },
    }
  },
}

export default DeleteAction
