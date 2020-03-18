import flat from 'flat'

import RecordJSON from '../../../backend/decorators/record-json.interface'

const { flatten, unflatten } = flat

/**
 * Changes RecordJSON that it can be send as a FormData to the backend.
 *
 * @param   {RecordJSON}  record
 * @return  {FormData}
 */
export default function recordToFormData(record: RecordJSON): FormData {
  const formData = new FormData()

  // First let make sure that all the fields in the record.params are properly flatten.
  // That is why we unflatten all properties and create regular object, where flat
  // overwrite prevents from having 2 keys referencing the same property. And
  // the result is flatten again.
  const normalizedParams = flatten<string, any>(unflatten(record.params, { overwrite: true }))
  Object.entries(normalizedParams).forEach(([key, value]) => {
    // flatten does not change empty objects "{}" - so in order to prevent having them changed to
    // "[object Object]" we have to set them to empty strings. File objects has to go through.
    // eslint-disable-next-line no-undef
    if (value === null || (typeof value === 'object' && (value as object).constructor !== File)) {
      formData.set(key, '')
    } else {
      formData.set(key, value as string)
    }
  })
  return formData
}
