import { ActionContext, ActionResponse } from '../../actions/action.interface'
import ValidationError, { PropertyErrors, RecordError } from '../../utils/errors/validation-error'
import ForbiddenError from '../../utils/errors/forbidden-error'

/**
 * @private
 * @classdesc
 * Function which catches all the errors thrown by the action hooks or handler
 */
const actionErrorHandler = (error: any, context: ActionContext): ActionResponse => {
  if (error instanceof ValidationError || error instanceof ForbiddenError) {
    const { resource, record, currentAdmin, action } = context

    let baseMessage = ''
    let baseError: RecordError | null = null
    let errors: PropertyErrors = {}
    let meta: any

    if (error instanceof ValidationError) {
      baseMessage = error.baseError?.message
        || context.translateMessage('thereWereValidationErrors', resource.id())
      baseError = error.baseError ?? null
      errors = error.propertyErrors
    } else {
      // Defaults to ForbiddenError
      baseMessage = error.baseMessage
        || context.translateMessage('anyForbiddenError', resource.id())
    }

    // Add required meta data for the list action
    if (action.name === 'list') {
      meta = {
        total: 0,
        perPage: 0,
        page: 0,
        direction: null,
        sortBy: null,
      }
    }

    const recordJson = record?.toJSON?.(currentAdmin)

    return {
      record: {
        ...recordJson,
        params: recordJson?.params ?? {},
        populated: recordJson?.populated ?? {},
        baseError,
        errors,
      },
      records: [],
      notice: {
        message: baseMessage,
        type: 'error',
      },
      meta,
    }
  }
  throw error
}


export default actionErrorHandler
