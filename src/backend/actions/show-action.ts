import Action from './action.interface'
import RecordJSON from '../decorators/record-json.interface'

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
  handler: async (request, response, data): Promise<ShowActionResponse> => ({
    record: data.record.toJSON(data.currentAdmin),
  }),
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
