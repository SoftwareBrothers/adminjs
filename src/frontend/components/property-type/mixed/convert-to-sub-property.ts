import { DELIMITER } from '../../../../utils/flat/constants'
import { PropertyJSON, BasePropertyJSON } from '../../../interfaces'

export function convertToSubProperty(
  property: PropertyJSON,
  subProperty: BasePropertyJSON,
): PropertyJSON {
  return {
    ...subProperty,
    path: [property.path, subProperty.name].join(DELIMITER),
  }
}
