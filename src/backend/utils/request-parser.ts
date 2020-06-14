import { ActionRequest } from '../actions/action.interface'
import BaseResource from '../adapters/base-resource'

/**
 * Takes the original ActionRequest and convert string values to a corresponding
 * types.
 *
 * @param {ActionRequest} originalRequest
 * @param {BaseResource}  resource
 * @returns {ActionRequest}
 *
 * @private
 */
const RequestParser = (originalRequest: ActionRequest, resource: BaseResource): ActionRequest => {
  const { payload: originalPayload = {} } = originalRequest

  const payload = Object.entries(originalPayload).reduce((memo, [path, value]) => {
    const property = resource.property(path)

    if (property) {
      if (property.type() === 'boolean') {
        if (value === 'true') { return { ...memo, [path]: true } }
        if (value === 'false') { return { ...memo, [path]: false } }
        if (value === '') { return { ...memo, [path]: false } }
      }
      if (['date', 'datetime'].includes(property.type())) {
        if (value === '') { return { ...memo, [path]: null } }
      }
      if (property.type() === 'string') {
        const availableValues = property.availableValues()
        if (availableValues && !availableValues.includes(value) && value === '') {
          return { ...memo, [path]: null }
        }
      }
      if (property.isArray() && value === '') {
        return { ...memo, [path]: [] }
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
