import flat from 'flat'

import RecordJSON from '../../../../backend/decorators/record-json.interface'

const { flatten } = flat

/**
 * for given params:
 *
 * example:
 * ```
 * anotherItem: 'value'
 * Item.0.imageVariants.0.dateCreated: "2019-09-19T10:00:00.000Z"
 * Item.0.imageVariants.0.imageURL: "url to help"
 * Item.0.imageVariants.0.isApproved: true
 * Item.0.imageVariants.0.isDeleted: false
 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
 * Item.0.imageVariants.1.imageURL: "url 2"
 * ```
 *
 * and given propertyPath, example: `Item.0.imageVariants`
 * and new array, example: [{
 *   dateCreated: "2019-09-19T19:10:34.919Z"
 *   imageURL: "url 2"
 * }]
 *
 * returns:
 * ```
 * anotherItem: 'value'
 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
 * Item.0.imageVariants.1.imageURL: "url 2"
 * ```
 *
 * @private
 */
export default function updateParamsArray(
  params: RecordJSON['params'],
  propertyPath: string,
  array: Array<any>,
): RecordJSON['params'] {
  const regex = new RegExp(`^${propertyPath}`)
  const filteredParams = Object.entries(params)
    .filter(([key]) => !key.match(regex))
    .reduce((memo, [key, value]) => ({
      ...memo,
      [key]: value,
    }), {})

  return flatten({
    ...filteredParams,
    [propertyPath]: array,
  })
}
