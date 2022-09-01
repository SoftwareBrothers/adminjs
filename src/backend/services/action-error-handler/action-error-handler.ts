import { ActionContext, RecordActionResponse, BulkActionResponse } from '../../actions/action.interface'
import ValidationError, { PropertyErrors } from '../../utils/errors/validation-error'
import ForbiddenError from '../../utils/errors/forbidden-error'
import NotFoundError from '../../utils/errors/not-found-error'
import AppError from '../../utils/errors/app-error'
import RecordError from '../../utils/errors/record-error'

/**
 * @private
 * @classdesc
 * Function which catches all the errors thrown by the action hooks or handler
 */
const actionErrorHandler = (
  error: Error,
  context: ActionContext,
): RecordActionResponse | BulkActionResponse => {
  if (
    error instanceof ValidationError
    || error instanceof ForbiddenError
    || error instanceof NotFoundError
    || error instanceof AppError
  ) {
    const { record, resource, currentAdmin, action } = context

    const baseError: RecordError | null = error.baseError ?? null
    let baseMessage = ''
    let errors: PropertyErrors = {}
    let meta: any

    if (error instanceof ValidationError) {
      baseMessage = error.baseError?.message
        || context.translateMessage('thereWereValidationErrors', resource.id())
      errors = error.propertyErrors
    } else {
      // ForbiddenError, NotFoundError, AppError
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
