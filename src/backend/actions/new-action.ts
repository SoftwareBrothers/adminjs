import Action from './action.interface'
import RecordJSON from '../decorators/record-json.interface'

/**
 * @implements Action
 * @category Actions
 * @module NewAction
 * @description
 * Shows form for creating a new record
 * Uses {@link NewAction} component to render form
 */
const NewAction: Action = {
  name: 'new',
  isVisible: true,
  actionType: 'resource',
  icon: 'icomoon-add',
  label: 'Add new',
  /**
   * Responsible for creating new record.
   *
   * To invoke this action use {@link ApiClient#resourceAction}
   *
   * @implements Action.handler
   * @memberof module:NewAction
   * @return {Promise<NewActionResponse>} populated records
   */
  handler: async (request, response, data): Promise<NewActionResponse> => {
    if (request.method === 'post') {
      let record = await data.resource.build(request.payload ? request.payload.record : {})
      record = await record.save()
      if (record.isValid()) {
        return {
          redirectUrl: data.h.recordActionUrl({
            resourceId: data.resource.id(), recordId: record.id(), actionName: 'show',
          }),
          record: record.toJSON(data.currentAdmin),
        }
      }
      return { record: record.toJSON(data.currentAdmin) }
    }
    // TODO: add wrong implementation error
    throw new Error('new action can be invoked only via `post` http method')
  },
}

export default NewAction

/**
 * Response returned by NewAction
 * @memberof module:NewAction
 * @alias NewActionResponse
 */
type NewActionResponse = {
  /**
   * Record which was created or with errors.
   */
  record: RecordJSON;
  /**
   * If rectrd has been created it contains redirect path
   */
  redirectUrl?: string;
}
