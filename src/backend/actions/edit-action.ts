import Action from './action.interface'
import RecordJSON from '../decorators/record-json.interface'
import NotFoundError from '../utils/not-found-error'

/**
 * @implements Action
 * @category Actions
 * @module EditAction
 * @description
 * Shows form for updating existing record
 *
 * Uses {@link EditAction} component to render form
 */
const EditAction: Action = {
  name: 'edit',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-edit',
  label: 'Edit',
  /**
   * Responsible for updating existing record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {EditActionResponse}  populated record
   * @implements Action.handler
   * @memberof module:EditAction
   */
  handler: async (request, response, data): Promise<EditActionResponse> => {
    const { record } = data
    if (!record) {
      throw new NotFoundError([
        `Record of given id ("${request.params.recordId}") could not be found`,
      ].join('\n'), 'Action#handler')
    }
    if (request.method === 'get') {
      return { record: record.toJSON(data.currentAdmin) }
    }
    await record.update(request.payload && request.payload.record)
    if (record.isValid()) {
      return {
        redirectUrl: data.h.recordActionUrl({
          resourceId: data.resource.id(), recordId: record.id(), actionName: 'show',
        }),
        record: record.toJSON(data.currentAdmin),
      }
    }
    return { record: record.toJSON(data.currentAdmin) }
  },
}

export default EditAction

/**
 * Type of response returned by {@link module:DeleteAction}
 * @memberof module:EditAction
 */
type EditActionResponse = {
  /**
   * in case of success it fills this filed
   * to indicate that there should be
   * redirect after the action.
   */
  redirectUrl?: string;
  /**
   * Updated record
   */
  record: RecordJSON;
}
