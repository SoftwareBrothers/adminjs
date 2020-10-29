import PropertyDecorator from '../../property/property-decorator'

/**
 * Bu default all subProperties are nested as an array in root Property. This is easy for
 * adapter to maintain. But in AdminBro core we need a fast way to access them by path.
 *
 * This function changes an array to object recursively (for nested subProperties) so they
 * could be accessed via properties['path.to.sub.property']
 *
 * @param   {PropertyDecorator}  rootProperty
 *
 * @return  {Record<PropertyDecorator>}
 * @private
 */
export const flatSubProperties = (
  rootProperty: PropertyDecorator,
): Record<string, PropertyDecorator> => (
  rootProperty.subProperties().reduce((subMemo, subProperty) => Object.assign(
    subMemo,
    { [subProperty.propertyPath]: subProperty },
    flatSubProperties(subProperty),
  ), {})
)
