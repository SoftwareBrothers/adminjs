import { NotFoundError } from '@adminjs/common/errors'

import { Action, RecordActionResponse } from '../action.interface'
import populator from '../../utils/populator/populator'
import { paramConverter } from '../../utils/param-converter'

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
    const { record, resource, currentAdmin } = context
    if (!record) {
      throw new NotFoundError([
        `Record of given id ("${request.params.recordId}") could not be found`,
      ].join('\n'), 'Action#handler')
    }
    if (request.method === 'get') {
      return { record: record.toJSON(currentAdmin) }
    }

    const params = paramConverter.prepareParams(request.payload ?? {}, resource)
    const newRecord = await record.update(params)
    const [populatedRecord] = await populator([newRecord])

    // eslint-disable-next-line no-param-reassign
    context.record = populatedRecord

    if (record.isValid()) {
      return {
        notice: {
          message: 'successfullyUpdated',
          resourceId: resource.decorate().id(),
          type: 'success',
        },
        record: populatedRecord.toJSON(currentAdmin),
      }
    }
    const baseMessage = populatedRecord.baseError?.message ?? 'thereWereValidationErrors'
    return {
      record: populatedRecord.toJSON(currentAdmin),
      notice: {
        message: baseMessage,
        resourceId: resource.decorate().id(),
        type: 'error',
      },
    }
  },
}

export default EditAction
