import BaseRecord from '../../adapters/record/base-record.js'
import { populateProperty } from './populate-property.js'
import { ActionContext } from '../../actions/index.js'

/**
 * @load ./populator.doc.md
 * @param {Array<BaseRecord>} records
 * @param context
 * @new In version 3.3
 */
export async function populator(
  records: Array<BaseRecord>,
  context?:ActionContext,
): Promise<Array<BaseRecord>> {
  if (!records || !records.length) {
    return records
  }
  const resourceDecorator = records[0].resource.decorate()
  const allProperties = Object.values(resourceDecorator.getFlattenProperties())

  const references = allProperties.filter((p) => !!p.reference())

  await Promise.all(references.map(async (propertyDecorator) => {
    await populateProperty(records, propertyDecorator, context)
  }))
  return records
}

export default populator
