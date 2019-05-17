/**
 * Populates all records references. If the record has a reference to let say `user_id`
 * it will fill record.populated['user_id'] with the corresponding User record.
 *
 * It mutates the `records` param
 *
 * @param {Array<BaseRecord>} records
 * @param {Array<BaseProperty>} [properties] when given it will only populate those properties
 * @private
 */
const populator = async (records, properties) => {
  if (!records || !records.length) {
    return records
  }
  const allProperties = Object.values(records[0].resource.decorate().properties)
  const populateProperties = properties || allProperties

  const references = populateProperties.filter(p => !!p.reference())

  await Promise.all(references.map(async (propertyDecorator) => {
    const referenceResource = propertyDecorator.reference()
    await referenceResource.populate(records, propertyDecorator._property)
  }))
  return records
}

module.exports.populator = populator
