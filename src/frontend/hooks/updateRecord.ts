import flat from 'flat'

import RecordJSON from '../../backend/decorators/record-json.interface'

/**
 * Returns a function which takes a record and returns an updated record.
 *
 * @param property property that must be updated, supports nesting with dots
 * @param value value that must be set, undefined or null if deleting, will be flattened
 * @param refRecord if value is reference ID, this must be a record it's referencing to
 */
const updateRecord = (
  property: string,
  value: any,
  refRecord?: RecordJSON,
) => (previousRecord: RecordJSON): RecordJSON => {
  let populatedModified = false
  const populatedCopy = { ...previousRecord.populated }
  const paramsCopy = { ...previousRecord.params }
  // clear previous value
  Object.keys(paramsCopy)
    .filter(key => key === property || key.startsWith(`${property}.`))
    .forEach(k => delete paramsCopy[k])
  if (property in populatedCopy) {
    delete populatedCopy[property]
    populatedModified = true
  }
  // set new value
  if (value) {
    if (typeof value === 'object') {
      const flattened = flat.flatten(value) as any
      Object.keys(flattened).forEach((key) => {
        paramsCopy[`${property}.${key}`] = flattened[key]
      })
    } else {
      paramsCopy[property] = value
    }
    if (refRecord) {
      populatedCopy[property] = refRecord
      populatedModified = true
    }
  }
  return {
    ...previousRecord,
    params: paramsCopy,
    populated: populatedModified ? populatedCopy : previousRecord.populated,
  }
}

export default updateRecord
