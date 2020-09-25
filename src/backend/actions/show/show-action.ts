import { Action, RecordActionResponse } from '../action.interface'
import NotFoundError from '../../utils/errors/not-found-error'

/**
 * @implements Action
 * @category Actions
 * @module ShowAction
 * @description
 * Returns selected Record
 * Uses {@link ShowAction} component to render form
 * @private
 */
export const ShowAction: Action<RecordActionResponse> = {
  name: 'show',
  isVisible: true,
  actionType: 'record',
  icon: 'Screen',
  showInDrawer: false,
  /**
   * Responsible for returning data for given record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   * @memberof module:ShowAction
   *
   * @return  {Promise<RecordActionResponse>}  populated record
   * @implements ActionHandler
   */
  handler: async (request, response, data) => {
    if (!data.record) {
      throw new NotFoundError([
        `Record of given id ("${request.params.recordId}") could not be found`,
      ].join('\n'), 'Action#handler')
    }
    return {
      record: data.record.toJSON(data.currentAdmin),
    }
  },
}

export default ShowAction
