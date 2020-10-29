import { ActionRequest } from '../../actions'
import { BaseResource } from '../../adapters'
import {
  FORM_VALUE_NULL,
  FORM_VALUE_EMPTY_OBJECT,
  FORM_VALUE_EMPTY_ARRAY,
} from '../../../frontend/hooks/use-record/params-to-form-data'

/**
 * Takes the original ActionRequest and convert string values to a corresponding
 * types. It
 *
 * @param {ActionRequest} originalRequest
 * @param {BaseResource}  resource
 * @returns {ActionRequest}
 *
 * @private
 */
export const requestParser = (
  originalRequest: ActionRequest,
  resource: BaseResource,
): ActionRequest => {
  const { payload: originalPayload } = originalRequest

  const payload = Object.entries(originalPayload || {}).reduce((memo, [path, formValue]) => {
    const property = resource._decorated?.getPropertyByKey(path)

    let value = formValue
    if (formValue === FORM_VALUE_NULL) { value = null }
    if (formValue === FORM_VALUE_EMPTY_OBJECT) { value = {} }
    if (formValue === FORM_VALUE_EMPTY_ARRAY) { value = [] }

    if (property) {
      if (property.type() === 'boolean') {
        if (value === 'true') {
          memo[path] = true
          return memo
        }
        if (value === 'false') {
          memo[path] = false
          return memo
        }
        if (value === '') {
          memo[path] = false
          return memo
        }
      }
      if (['date', 'datetime'].includes(property.type())) {
        if (value === '' || value === null) {
          memo[path] = null
          return memo
        }
      }
      if (property.type() === 'string') {
        const availableValues = property.availableValues()
        if (availableValues && !availableValues.includes(value) && value === '') {
          memo[path] = null
          return memo
        }
      }
    }

    memo[path] = value

    return memo
  }, {})

  return {
    ...originalRequest,
    payload,
  }
}

export default requestParser
