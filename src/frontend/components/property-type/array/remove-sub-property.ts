import { flat } from '../../../../utils/index.js'
import { RecordJSON } from '../../../interfaces/index.js'

/**
 * Removes selected array item from given record. It performs following tasks:
 * 1. removes array item from the array
 * 2. reorders keys in new array item
 * 3. if property has populated fields it also reorders them
 * it uses {@link flat } module and its removePath method
 *
 * @param {RecordJSON} record
 * @param {string}     subPropertyPath            which has to be removed. It has to be flattened
 *                                                in notation, and ending with array index
 * @private
 * @hide
 */
export const removeSubProperty = (record: RecordJSON, subPropertyPath: string): RecordJSON => {
  // by default populated is flatten just to the path level - object itself is not flatten. That is
  // why we have to retrieve the original state. That is why we have to replace record.populated to
  // from { 'some.nested.1.key': RecordJSON } to { 'some.nested.1.key': 'some.nested.1.key' },
  // then remove keys, and refill back some.nested.1.key to the value from the original populated
  // object.
  const populatedKeyMap: Record<string, string> = Object.keys(record.populated).reduce(
    (memo, propertyKey) => ({
      ...memo,
      [propertyKey]: propertyKey,
    }),
    {},
  )

  const newPopulatedKeyMap = flat.removePath(populatedKeyMap, subPropertyPath)
  const newPopulated = Object.entries(newPopulatedKeyMap)
    .reduce((memo, [newPropertyKey, oldPropertyKey]) => ({
      ...memo,
      [newPropertyKey]: oldPropertyKey && record.populated[oldPropertyKey?.toString()],
    }), {})

  return {
    ...record,
    params: flat.removePath(record.params, subPropertyPath),
    populated: newPopulated,
  }
}
