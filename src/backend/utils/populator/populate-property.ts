import { BaseRecord } from '../../adapters'
import PropertyDecorator from '../../decorators/property/property-decorator'

export type PopulatorNarrowedProperty = Pick<
  InstanceType<typeof PropertyDecorator>,
  'resource' | 'reference' | 'property' | 'path'
>

/**
 * It populates one property in given records
 *
 * @param {Array<BaseRecord>} records   array of records to populate
 * @param {PropertyDecorator} property  Decorator for the reference property to populate
 */
export const populateProperty = async (
  records: Array<BaseRecord> | null,
  property: PopulatorNarrowedProperty,
): Promise<Array<BaseRecord> | null> => {
  const decoratedResource = property.resource()

  if (!records || !records.length) {
    return records
  }

  const referencedResource = property.reference()

  if (!referencedResource) {
    throw new Error([
      `There is no reference resource named: "${property.property.reference}"`,
      `for property: "${decoratedResource.id()}.properties.${property.path}"`,
    ].join('\n'))
  }

  // I will describe the process for following data:
  // - decoratedResource = 'Comment'
  // - referenceResource = 'User'
  // property.path = 'userId'

  // first, we create externalIdsMap[1] = null where 1 is userId. This make keys unique and assign
  // nulls to each of them
  const externalIdsMap = records.reduce((memo, baseRecord) => {
    const foreignKeyValue = baseRecord.param(property.path)
    // when foreign key is not filled (like null) - don't add this because
    // BaseResource#findMany (which we will use) might break for nulls
    if (!foreignKeyValue) {
      return memo
    }
    return {
      ...memo,
      [foreignKeyValue]: null,
    }
  }, {})

  const uniqueExternalIds = Object.keys(externalIdsMap)

  // when no record has `userId` filled = return input `records`
  if (!uniqueExternalIds.length) {
    return records
  }

  // now find all referenced records: all users
  const referenceRecords = await referencedResource.findMany(uniqueExternalIds)

  //
  if (!referenceRecords || !referenceRecords.length) {
    return records
  }

  // now assign these users to `externalIdsMap` instead of the empty object we had. To speed up
  // assigning them to record#populated we will do in the next step
  referenceRecords.forEach((referenceRecord) => {
    // example: externalIds[1] = { ...userRecord } | null (if not found)
    const foreignKeyValue = referenceRecord.id()
    externalIdsMap[foreignKeyValue] = referenceRecord
  })

  return records.map((record) => {
    // we set record.populated['userId'] = externalIdsMap[record.param('userId)]
    const foreignKeyValue = record.param(property.path)
    record.populate(property.path, externalIdsMap[foreignKeyValue])
    return record
  })
}
