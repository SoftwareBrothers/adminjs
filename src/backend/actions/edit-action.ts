import Action, { RecordActionResponse } from './action.interface'
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
const EditAction: Action<RecordActionResponse> = {
  name: 'edit',
  isVisible: true,
  actionType: 'record',
  icon: 'Edit',
  label: 'Edit',
  showInDrawer: true,
  /**
   * Responsible for updating existing record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {RecordActionResponse}  populated record
   * @implements Action#handler
   * @memberof module:EditAction
   */
  handler: async (request, response, data) => {
    const { record } = data
    if (!record) {
      throw new NotFoundError([
        `Record of given id ("${request.params.recordId}") could not be found`,
      ].join('\n'), 'Action#handler')
    }
    if (request.method === 'get') {
      return { record: record.toJSON(data.currentAdmin) }
    }
    await record.update(request.payload)
    if (record.isValid()) {
      return {
        redirectUrl: data.h.resourceUrl({ resourceId: data.resource.id() }),
        notice: {
          message: 'Successfully updated the record',
          type: 'success',
        },
        record: record.toJSON(data.currentAdmin),
      }
    }
    return {
      record: record.toJSON(data.currentAdmin),
      notice: {
        message: 'There are validation errors - check them out below.',
        type: 'error',
      },
    }
  },
}

export default EditAction
