import { ActionContext, ActionResponse } from '../../actions/action.interface'
import ValidationError from '../../utils/errors/validation-error'
import ForbiddenError from '../../utils/errors/forbidden-error'

/**
 * @private
 * @classdesc
 * Function which catches all the errors thrown by the action hooks or handler
 */
const actionErrorHandler = (error: any, context: ActionContext): ActionResponse => {
  if (error instanceof ValidationError) {
    const { resource } = context
    const { record, currentAdmin } = context

    const baseMessage = error.baseError?.message
      || context.translateMessage('thereWereValidationErrors', resource.id())

    const recordJson = record?.toJSON?.(currentAdmin)

    return {
      record: {
        ...recordJson,
        params: recordJson?.params ?? {},
        populated: recordJson?.populated ?? {},
        errors: error.propertyErrors,
      },
      records: [],
      notice: {
        message: baseMessage,
        type: 'error',
      },
    }
  }
  if (error instanceof ForbiddenError) {
    const { resource } = context

    const baseMessage = error.baseMessage
      || context.translateMessage('anyForbiddenError', resource.id())

    return {
      notice: {
        message: baseMessage,
        type: 'error',
      },
    }
  }
  throw error
}


export default actionErrorHandler
