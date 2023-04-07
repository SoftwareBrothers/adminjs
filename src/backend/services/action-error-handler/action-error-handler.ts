import { NoticeMessage } from '../../../index.js'
import { ActionContext, BulkActionResponse, RecordActionResponse } from '../../actions/action.interface.js'
import AppError from '../../utils/errors/app-error.js'
import ForbiddenError from '../../utils/errors/forbidden-error.js'
import NotFoundError from '../../utils/errors/not-found-error.js'
import RecordError from '../../utils/errors/record-error.js'
import ValidationError, { PropertyErrors } from '../../utils/errors/validation-error.js'

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
    const { record, currentAdmin, action } = context

    const baseError: RecordError | null = error.baseError ?? null
    let baseMessage = ''
    let errors: PropertyErrors = {}
    let meta: any
    let notice: NoticeMessage
    if (error instanceof ValidationError) {
      baseMessage = error.baseError?.message
        || 'thereWereValidationErrors'
      errors = error.propertyErrors
    } else {
      // ForbiddenError, NotFoundError, AppError
      baseMessage = error.baseMessage
        || 'anyForbiddenError'
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

    notice = {
      message: baseMessage,
      type: 'error',
    }

    if (error instanceof AppError && error.notice) {
      notice = {
        ...notice,
        ...error.notice,
      }
    }

    return {
      record: {
        ...recordJson,
        params: recordJson?.params ?? {},
        populated: recordJson?.populated ?? {},
        baseError,
        errors,
      },
      records: [],
      notice,
      meta,
    }
  }
  throw error
}

export default actionErrorHandler
