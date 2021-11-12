import { DELIMITER } from '../../../../utils/flat/constants'
import { PropertyJSON } from '../../../interfaces'

/**
 * Converts property: PropertyJSON from an array to a sub-property for an actual item in the array
 * It change path that it has index inside along with the label. Futhermore flat isArray is removed
 * ,because it was already handled, so that itemRenderer can render property as a regular one
 *
 * @param {PropertyJSON}  arrayProperty property with path set to an root Array type property,
 * @param {Number}        index         index under which sub-property should be placed
 * @private
 * @hide
 */
export const convertToSubProperty = (arrayProperty: PropertyJSON, index: number): PropertyJSON => (
  {
    ...arrayProperty,
    path: [arrayProperty.path, index].join(DELIMITER),
    label: `[${index + 1}]`,
    isArray: false,
    isDraggable: false,
  }
)
