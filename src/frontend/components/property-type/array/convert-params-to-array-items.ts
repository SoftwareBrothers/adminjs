import flat from 'flat'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'

/**
 * Converts flatten params to array items when given property is an array.
 *
 * What problem it solves:
 * so let say user has a record with record.property:
 * ```
 * Item.0.imageVariants.0.dateCreated: "2019-09-19T10:00:00.000Z"
 * Item.0.imageVariants.0.imageURL: "url to help"
 * Item.0.imageVariants.0.isApproved: true
 * Item.0.imageVariants.0.isDeleted: false
 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
 * Item.0.imageVariants.1.imageURL: "url 2"
 * ```
 *
 * this function for property: `Item.0.imageVariants` should return array with 2 items. Where for
 * property `Item` array with one element
 *
 * @param {PropertyJSON} property
 * @param {RecordJSON} record
 *
 * @private
 */
const convertParamsToArrayItems = (property: PropertyJSON, record: RecordJSON): Array<string> => {
  const tempName = 'arrayField'
  const regex = new RegExp(`^${property.name}`)
  /**
   * in this step we filter keys which starts with regex the same as name. So let say
   * property name is: Item.0.imageVariants and the record.params is:
   * {
   *  'anyOtherKey': 'value'
   *  'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
   *  'Item.0.imageVariants.0.imageURL': 'url to help'
   * }
   *
   * so keys will be `Item.0.imageVariants.0.dateCreated` and `Item.0.imageVariants.0.imageURL`
   */
  const keys = Object.keys(record.params).filter(key => key.match(regex))

  /**
   * Next, we create new object with only those keys. But we have to rename the regex part
   * because it could has dots (take a look at const tempName = 'arrayField' on the top).
   * If we didn't do this - then unflatten function wouldn't work.
   *
   * so in our example obj is not: {
   *  'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
   *  'Item.0.imageVariants.0.imageURL': 'url to help'
   * }
   *
   * but: {
   *  'arrayField.0.dateCreated': '2019-09-19T10:00:00.000Z',
   *  'arrayField.0.imageURL': 'url to help'
   * }
   */
  const obj = keys.reduce((memo, key) => ({
    ...memo,
    [key.replace(regex, tempName)]: record.params[key],
  }), {})

  /**
   * In the last step we unflatten the object and return 'tempName' property:
   * {
   *  'arrayField: [{
   *     dateCreated': '2019-09-19T10:00:00.000Z',
   *     'arrayField.0.imageURL': 'url to help',
   *   }],
   * }['arrayField']
   */
  const unflatten = flat.unflatten(obj) as Array<string>
  return unflatten[tempName] || []
}

export default convertParamsToArrayItems
