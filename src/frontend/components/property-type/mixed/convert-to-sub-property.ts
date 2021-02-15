import { DELIMITER } from '../../../../utils/flat/constants'
import { PropertyJSON, BasePropertyJSON } from '../../../interfaces'

export function convertToSubProperty(
  property: PropertyJSON,
  subProperty: BasePropertyJSON,
): PropertyJSON {
  const [subPropertyPath] = subProperty.name.split(DELIMITER).slice(-1)
  return {
    ...subProperty,
    path: [property.path, subPropertyPath].join(DELIMITER),
  }
}
