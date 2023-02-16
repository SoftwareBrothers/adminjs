import PropertyDecorator from '../../property/property-decorator.js'
import { PathParts } from '../../../../utils/flat/path-parts.type.js'

/**
 * @private
 *
 * @param   {PathParts}  pathParts    parts returned by `pathToParts` method
 * @param   {PropertyDecorator}       rootProperty where function should recursively search for
 *                                    a subProperty matching one of the pathParts
 *
 * @return  {PropertyDecorator | null}  found subProperty
 */
export const findSubProperty = (
  pathParts: PathParts,
  rootProperty: PropertyDecorator,
): PropertyDecorator | null => {
  const subProperties = rootProperty.subProperties()
  const foundPath = pathParts.find((path) => (
    subProperties.find((supProperty) => supProperty.propertyPath === path)))
  if (foundPath) {
    const subProperty = subProperties.find((supProperty) => supProperty.propertyPath === foundPath)
    if (subProperty && foundPath !== pathParts[pathParts.length - 1]) {
      // if foundPath is not the last (full) path - checkout recursively all subProperties
      return findSubProperty(pathParts, subProperty)
    }
    return subProperty || null
  }
  return null
}
