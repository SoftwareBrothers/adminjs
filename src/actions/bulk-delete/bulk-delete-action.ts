import { NotFoundError } from '@adminjs/common/errors'

import { Action, BulkActionResponse } from '../action.interface'

/**
 * @implements Action
 * @category Actions
 * @module BulkDeleteAction
 * @description
 * Removes given records from the database.
 * @private
 */
export const BulkDeleteAction: Action<BulkActionResponse> = {
  name: 'bulkDelete',
  isVisible: true,
  actionType: 'bulk',
  icon: 'Delete',
  showInDrawer: true,
  variant: 'danger',
  /**
   * Responsible for deleting existing records.
   *
   * To invoke this action use {@link ApiClient#bulkAction}
   * with {actionName: _bulkDelete_}
   *
   * @return  {Promise<BulkActionResponse>}
   * @implements ActionHandler
   * @memberof module:BulkDeleteAction
   */
  handler: async (request, response, context) => {
    const { records, resource } = context

    if (!records || !records.length) {
      throw new NotFoundError('no records were selected.', 'Action#handler')
    }
    if (request.method === 'get') {
      const recordsInJSON = records.map((record) => record.toJSON(context.currentAdmin))
      return {
        records: recordsInJSON,
      }
    }
    if (request.method === 'post') {
      await Promise.all(records.map((record) => resource.delete(record.id())))
      return {
        records: records.map((record) => record.toJSON(context.currentAdmin)),
        notice: {
          message: 'successfullyBulkDeleted',
          resourceId: resource._decorated?.id?.() || resource.id(),
          payload: { count: records.length },
          type: 'success',
        },
      }
    }
    throw new Error('method should be either "post" or "get"')
  },
}

export default BulkDeleteAction
