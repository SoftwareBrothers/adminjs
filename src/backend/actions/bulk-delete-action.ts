import Action, { ActionResponse } from './action.interface'
import NotFoundError from '../utils/not-found-error'
import ValidationError from '../utils/validation-error'

/**
 * @implements Action
 * @category Actions
 * @module BulkDeleteAction
 * @description
 * Removes given records from the database.
 */
const DeleteAction: Action<ActionResponse> = {
  name: 'bulk-delete',
  isVisible: true,
  actionType: 'bulk',
  icon: 'icomoon-remove-2',
  label: 'Remove',
  /**
   * Responsible for deleting existing records.
   *
   * To invoke this action use {@link ApiClient#bulkAction}
   *
   * @return  {Promise<ActionResponse>}
   * @implements ActionHandler
   * @memberof module:BulkDeleteAction
   */
  handler: async (request, response, data) => {
    if (request.method === 'get') {
      return { }
    }
    return { }
  },
}

export default DeleteAction
