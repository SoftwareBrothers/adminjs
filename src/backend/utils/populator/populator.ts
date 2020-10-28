import BaseRecord from '../../adapters/record/base-record'
import { populateProperty } from './populate-property'

/**
 * @load ./populator.doc.md
 * @param {Array<BaseRecord>} records
 * @new In version 3.3
 */
export async function populator(
  records: Array<BaseRecord>,
): Promise<Array<BaseRecord>> {
  if (!records || !records.length) {
    return records
  }
  const resourceDecorator = records[0].resource.decorate()
  const allProperties = Object.values(resourceDecorator.getFlattenProperties())

  const references = allProperties.filter(p => !!p.reference())

  await Promise.all(references.map(async (propertyDecorator) => {
    await populateProperty(records, propertyDecorator)
  }))
  return records
}

export default populator
