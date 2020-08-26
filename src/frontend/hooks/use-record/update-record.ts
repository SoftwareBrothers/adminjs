import flat from 'flat'
import RecordJSON from '../../../backend/decorators/record-json.interface'

/**
 * HOF returning a function which takes a record and returns an updated record.
 * This way we can pass this to setState in react, which takes old state
 * (in our case previousRecord) as an argument.
 *
 * Function is used when to the {@link OnPropertyChange} callback, user passes
 * key (property name) and the value (followed by an optional selectedRecord).
 *
 * The responsibility of the function is to:
 * - clear old values under passed key: so when user passes property === `some.key`
 *   function removes `some.key.1`, `some.key.2` etc
 * - sets new value under the passed key for primitive types
 * - in case of objects - it flattens them first and then sets all the resulted values
 *   under the path provided in the property argument
 * - it fills value in RecordJSON#populated when selectedRecord is given
 * - finally it invalidates populated for given property
 *
 *
 * @param {string}      property        property that must be updated, supports nesting
 *                                      with dots
 * @param {any}         value           value that must be set, undefined or null if
 *                                      deleting, will be flattened
 * @param {RecordJSON}  selectedRecord  if value is reference ID, this must be a record
 *                                      it's referencing to
 * @private
 */
const updateRecord = (
  property: string,
  value: any,
  selectedRecord?: RecordJSON,
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
  if (typeof value !== 'undefined') {
    if (typeof value === 'object' && !(value instanceof File) && value !== null) {
      const flattened = flat.flatten(value) as any
      if (Object.keys(flattened).length) {
        Object.keys(flattened).forEach((key) => {
          paramsCopy[`${property}.${key}`] = flattened[key]
        })
      } else if (Array.isArray(value)) {
        paramsCopy[property] = []
      } else {
        paramsCopy[property] = {}
      }
    } else {
      paramsCopy[property] = value
    }
  }

  if (selectedRecord) {
    populatedCopy[property] = selectedRecord
    populatedModified = true
  }

  return {
    ...previousRecord,
    params: paramsCopy,
    populated: populatedModified ? populatedCopy : previousRecord.populated,
  }
}

export default updateRecord
