import { ActionRequest } from '../actions/action.interface'
import BaseResource from '../adapters/base-resource'
import { FORM_VALUE_NULL, FORM_VALUE_EMPTY_OBJECT, FORM_VALUE_EMPTY_ARRAY } from '../../frontend/hooks/use-record/record-to-form-data'

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
const RequestParser = (originalRequest: ActionRequest, resource: BaseResource): ActionRequest => {
  const { payload: originalPayload } = originalRequest

  const payload = Object.entries(originalPayload || {}).reduce((memo, [path, formValue]) => {
    const property = resource._decorated?.getPropertyByKey(path)

    let value = formValue
    if (formValue === FORM_VALUE_NULL) { value = null }
    if (formValue === FORM_VALUE_EMPTY_OBJECT) { value = {} }
    if (formValue === FORM_VALUE_EMPTY_ARRAY) { value = [] }

    if (property) {
      if (property.type() === 'boolean') {
        if (value === 'true') { return { ...memo, [path]: true } }
        if (value === 'false') { return { ...memo, [path]: false } }
        if (value === '') { return { ...memo, [path]: false } }
      }
      if (['date', 'datetime'].includes(property.type())) {
        if (value === '' || value === null) { return { ...memo, [path]: null } }
      }
      if (property.type() === 'string') {
        const availableValues = property.availableValues()
        if (availableValues && !availableValues.includes(value) && value === '') {
          return { ...memo, [path]: null }
        }
      }
    }

    return {
      ...memo,
      [path]: value,
    }
  }, {})

  return {
    ...originalRequest,
    payload,
  }
}

export default RequestParser
