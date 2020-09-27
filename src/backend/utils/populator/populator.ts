import BaseRecord from '../../adapters/record/base-record'
import { populateProperty } from './populate-property'

/**
 * Populates all records references. If the record has a reference to let say `user_id`
 * it will fill record.populated['user_id'] with the corresponding User record.
 *
 * It mutates the `records` param
 *
 * @param {Array<BaseRecord>} records
 * @new In version 3.3
 */
export const populator = async (
  records: Array<BaseRecord>,
): Promise<Array<BaseRecord>> => {
  if (!records || !records.length) {
    return records
  }
  const resourceDecorator = records[0].resource.decorate()
  const allProperties = Object.values(resourceDecorator.properties)

  const references = allProperties.filter(p => !!p.reference())

  await Promise.all(references.map(async (propertyDecorator) => {
    await populateProperty(records, propertyDecorator)
  }))
  return records
}

export default populator
