import Action from './action.interface'
import RecordJSON from '../decorators/record-json.interface'
import NotFoundError from '../utils/not-found-error'

/**
 * @implements Action
 * @category Actions
 * @module ShowAction
 * @description
 * Retruns selected Record
 * Uses {@link ShowAction} component to render form
 */
const ShowAction: Action = {
  name: 'show',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-info',
  label: 'Info',
  /**
   * Responsible for returning data for given record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   * @memberof module:ShowAction
   *
   * @return  {Promise<ShowActionResponse>}  populated record
   * @implements ActionHandler
   */
  handler: async (request, response, data): Promise<ShowActionResponse> => {
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

/**
 * Response of a ShowAction
 * @memberof module:ShowAction
 * @alias ShowActionResponse
 */
type ShowActionResponse = {
  /**
   * Record object
   */
  record: RecordJSON;
}
