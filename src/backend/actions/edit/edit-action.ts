import { Action, RecordActionResponse } from '../action.interface.js'
import NotFoundError from '../../utils/errors/not-found-error.js'
import populator from '../../utils/populator/populator.js'
import { paramConverter } from '../../../utils/param-converter/index.js'

/**
 * @implements Action
 * @category Actions
 * @module EditAction
 * @description
 * Shows form for updating existing record
 * @private
 *
 * @classdesc
 * Uses {@link EditAction} component to render form
 */
export const EditAction: Action<RecordActionResponse> = {
  name: 'edit',
  isVisible: true,
  actionType: 'record',
  icon: 'Edit',
  showInDrawer: false,
  /**
   * Responsible for updating existing record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {RecordActionResponse}  populated record
   * @implements Action#handler
   * @memberof module:EditAction
   */
  handler: async (request, response, context) => {
    const { record, resource, currentAdmin, h } = context
    if (!record) {
      throw new NotFoundError([
        `Record of given id ("${request.params.recordId}") could not be found`,
      ].join('\n'), 'Action#handler')
    }
    if (request.method === 'get') {
      return { record: record.toJSON(currentAdmin) }
    }

    const params = paramConverter.prepareParams(request.payload ?? {}, resource)
    const newRecord = await record.update(params, context)
    const [populatedRecord] = await populator([newRecord], context)

    // eslint-disable-next-line no-param-reassign
    context.record = populatedRecord

    if (record.isValid()) {
      return {
        redirectUrl: h.resourceUrl({ resourceId: resource._decorated?.id() || resource.id() }),
        notice: {
          message: 'successfullyUpdated',
          type: 'success',
        },
        record: populatedRecord.toJSON(currentAdmin),
      }
    }
    const baseMessage = populatedRecord.baseError?.message
      || 'thereWereValidationErrors'
    return {
      record: populatedRecord.toJSON(currentAdmin),
      notice: {
        message: baseMessage,
        type: 'error',
      },
    }
  },
}

export default EditAction
