import { ResourceDecorator } from '..'
import AdminBro from '../../../../admin-bro'
import { BaseProperty, BaseResource } from '../../../adapters'
import { PropertyDecorator } from '../../property'

export type DecoratedProperties = {[key: string]: PropertyDecorator}

/**
 * Initializes PropertyDecorator for all properties within a resource. When
 * user passes new property in the options - it will be created as well.
 *
 * @returns {Object<string,PropertyDecorator>}
 * @private
 */
export function decorateProperties(
  resource: BaseResource,
  admin: AdminBro,
  decorator: ResourceDecorator,
): DecoratedProperties {
  const { options } = decorator

  // decorate all existing top-level properties
  const properties = resource.properties().reduce((memo, property) => {
    const decoratedProperty = new PropertyDecorator({
      property,
      admin,
      options: options.properties && options.properties[property.name()],
      resource: decorator,
    })
    return { ...memo, [property.name()]: decoratedProperty }
  }, {} as DecoratedProperties)

  // decorate all properties user gave in options but they don't exist in the resource
  if (options.properties) {
    Object.keys(options.properties).forEach((key) => {
      const property = new BaseProperty({ path: key, isSortable: false })
      properties[key] = new PropertyDecorator({
        property,
        admin,
        options: options.properties && options.properties[key],
        resource: decorator,
      })
    })
  }
  return properties
}
