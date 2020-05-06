import { ActionContext, ActionResponse } from '../actions/action.interface'
import ValidationError from '../utils/validation-error'
import ForbiddenError from '../utils/forbidden-error'

/**
 * @private
 *
 * Function which catches all the errors thrown by the action hooks or handler
 */
const actionErrorHandler = (error: any, context: ActionContext): ActionResponse => {
  if (error instanceof ValidationError) {
    const { resource } = context
    const { record, currentAdmin } = context

    const baseMessage = error.baseError?.message
      || context.translateMessage('thereWereValidationErrors', resource.id())

    return {
      record: {
        ...record?.toJSON(currentAdmin),
        params: {},
        populated: {},
        errors: error.propertyErrors,
      },
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
