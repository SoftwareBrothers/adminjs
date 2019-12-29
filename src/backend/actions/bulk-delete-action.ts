import Action, { ActionResponse } from './action.interface'
import ViewHelpers from '../utils/view-helpers'
import NotFoundError from '../utils/not-found-error'


/**
 * @implements Action
 * @category Actions
 * @module BulkDeleteAction
 * @description
 * Removes given records from the database.
 */
const BulkDeleteAction: Action<ActionResponse> = {
  name: 'bulkDelete',
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
    const { records, resource, h } = data

    if (!records || !records.length) {
      throw new NotFoundError('no records were selected.', 'Action#handler')
    }
    if (request.method === 'get') {
      const recordsInJSON = records.map(record => record.toJSON(data.currentAdmin))
      return {
        records: recordsInJSON,
      }
    }
    if (request.method === 'post') {
      await Promise.all(records.map(record => resource.delete(record.id())))
      return {
        records: records.map(record => record.toJSON(data.currentAdmin)),
        notice: {
          message: `Successfully deleted ${records.length} records.`,
          type: 'success',
        },
        redirectUrl: h.resourceActionUrl({ resourceId: resource.id(), actionName: 'list' }),
      }
    }
    throw new Error('method shoud be either "post" or "get"')
  },
}

export default BulkDeleteAction
