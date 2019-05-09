/**
 * @implements Action
 * @category Actions
 * @module ShowAction
 * @description
 * Retruns selected Record
 * Uses {@link ShowAction} component to render form
 */
module.exports = {
  name: 'show',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-info',
  label: 'Info',
  /**
   * Responsible for returning data for given record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {BaseRecord~JSON}  populated record
   * @implements Action.handler
   */
  handler: async (request, response, data) => ({
    record: data.record.toJSON(),
  }),
}
