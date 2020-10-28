export const FORM_VALUE_NULL = '__FORM_VALUE_NULL__'
export const FORM_VALUE_EMPTY_OBJECT = '__FORM_VALUE_EMPTY_OBJECT__'
export const FORM_VALUE_EMPTY_ARRAY = '__FORM_VALUE_EMPTY_ARRAY__'

const isObjectOrArray = (value: any): boolean => (
  typeof value === 'object'
  && (value as object).constructor !== File
  && !(value instanceof Date)
)

/**
 * Changes RecordJSON that it can be send as a FormData to the backend.
 *
 * FormData is required because we are sending files via the wire. But it has limitations.
 * Namely it can only transport files and strings. That is why we have to convert some
 * standard types like NULL to constants so they can be property converted back by the backend.
 * And thus properly handled.
 *
 * @private
 * @param   {RecordJSON}  record
 * @return  {FormData}
 */
function paramsToFormData(params: Record<string, any>): FormData {
  const formData = new FormData()

  // Assume that params are flatted
  Object.entries(params).forEach(([key, value]) => {
    // {@link updateRecord} does not change empty objects "{}" - so in order to prevent having
    // them changed to "[object Object]" we have to set them to empty strings.
    if (value === null) {
      return formData.set(key, FORM_VALUE_NULL)
    }
    // File objects has to go through because they are handled by FormData
    if (isObjectOrArray(value)) {
      if (Array.isArray(value)) {
        return formData.set(key, FORM_VALUE_EMPTY_ARRAY)
      }
      return formData.set(key, FORM_VALUE_EMPTY_OBJECT)
    }

    // Rest goes as a standard value
    return formData.set(key, value as string)
  })
  return formData
}

export {
  paramsToFormData as default,
  paramsToFormData,
}
