import Action from './action.interface'
import NotFoundError from '../utils/not-found-error'
import RecordJSON from '../decorators/record-json.interface'

/**
 * @implements Action
 * @category Actions
 * @module DeleteAction
 * @description
 * Removes given record from the database. Since it doesn't have a
 * component - it redirects right away after clicking its {@link ActionButton}
 */
const DeleteAction: Action = {
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
   * @return  {Promise<DeleteActionResponse>}
   * @implements ActionHandler
   * @memberof module:DeleteAction
   */
  handler: async (request, response, data): Promise<DeleteActionResponse> => {
    if (!request.params.recordId || !data.record) {
      throw new NotFoundError([
        'You have to pass "recordId" to Delete Action',
      ].join('\n'), 'Action#handler')
    }
    await data.resource.delete(request.params.recordId)
    return {
      record: data.record.toJSON(data.currentAdmin),
      redirectUrl: data.h.resourceActionUrl({ resourceId: data.resource.id(), actionName: 'list' }),
    }
  },
}

/**
 * Response of a delete action handler
 * @memberof module:DeleteAction
 * @alias DeleteActionResponse
 */
type DeleteActionResponse = {
  /**
   * URL on which user should be redirected after the action
   */
  redirectUrl: string;
  record: RecordJSON;
}

export default DeleteAction
