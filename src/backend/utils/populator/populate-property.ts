import { DELIMITER } from '../../../utils/flat/constants'
import { BaseRecord } from '../../adapters'
import PropertyDecorator from '../../decorators/property/property-decorator'

const isValueSearchable = (value: any): value is string | number => (
  ['string', 'bigint', 'number'].includes(typeof value)
    && value !== null
    && value !== ''
)
/**
 * It populates one property in given records
 *
 * @param {Array<BaseRecord>} records   array of records to populate
 * @param {PropertyDecorator} property  Decorator for the reference property to populate
 * @private
 */
export async function populateProperty(
  records: Array<BaseRecord> | null,
  property: PropertyDecorator,
): Promise<Array<BaseRecord> | null> {
  const decoratedResource = property.resource()

  if (!records || !records.length) {
    return records
  }

  const referencedResource = property.reference()

  if (!referencedResource) {
    throw new Error([
      `There is no reference resource named: "${property.property.reference}"`,
      `for property: "${decoratedResource.id()}.properties.${property.propertyPath}"`,
    ].join('\n'))
  }

  // I will describe the process for following data:
  // - decoratedResource = 'Comment'
  // - referenceResource = 'User'
  // property.path = 'userId'

  // first, we create externalIdsMap[1] = null where 1 is userId. This make keys unique and assign
  // nulls to each of them
  const externalIdsMap = records.reduce((memo, baseRecord) => {
    const foreignKeyValue = baseRecord.get(property.propertyPath)
    // array properties returns arrays so we have to take the all into consideration
    if (Array.isArray(foreignKeyValue) && property.isArray()) {
      return foreignKeyValue.reduce((arrayMemo, valueInArray) => ({
        ...arrayMemo,
        ...(isValueSearchable(valueInArray) ? { [valueInArray]: valueInArray } : {}),
      }), memo)
    }

    if (!isValueSearchable(foreignKeyValue)) {
      return memo
    }
    return {
      ...memo,
      [foreignKeyValue]: foreignKeyValue,
    }
  }, {})

  const uniqueExternalIds = Object.values<string | number>(externalIdsMap)

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
    // but this can also be an array - we have to check it
    const foreignKeyValue = record.get(property.propertyPath)

    if (Array.isArray(foreignKeyValue)) {
      foreignKeyValue.forEach((foreignKeyValueItem, index) => {
        record.populate(
          [property.propertyPath, index].join(DELIMITER),
          externalIdsMap[foreignKeyValueItem],
        )
      })
    } else if (typeof foreignKeyValue === 'string' || typeof foreignKeyValue === 'number') {
      record.populate(property.propertyPath, externalIdsMap[foreignKeyValue])
    }

    return record
  })
}
