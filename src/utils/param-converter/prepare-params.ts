import { BaseResource } from '../..'
import { flat } from '../flat'
import { convertNestedParam } from './convert-nested-param'
import { convertParam } from './convert-param'

const prepareParams = (
  params: Record<string, any>,
  resource: BaseResource,
): Record<string, any> => {
  const properties = resource.properties()
  const preparedParams: Record<string, any> = {}

  for (const property of properties) {
    let param = flat.get(params, property.path())
    const key = property.path()
    const propertyDecorator = resource._decorated?.properties[key].toJSON()

    // eslint-disable-next-line no-continue
    if (param === undefined || param === null) continue

    if (property.type() !== 'mixed') {
      if (propertyDecorator?.isArray) {
        preparedParams[key] = param.map(p => convertParam(p, property.type()))
      } else {
        preparedParams[key] = convertParam(param, property.type())
      }
    } else {
      if (param !== null && propertyDecorator?.subProperties.length) {
        const { subProperties } = propertyDecorator
        for (const subProperty of subProperties) {
          if (propertyDecorator.isArray) {
            param = param.map(p => convertNestedParam(p, subProperty))
          } else {
            param = convertNestedParam(param, subProperty)
          }
        }
      }

      preparedParams[key] = param
    }
  }

  return { ...params, ...preparedParams }
}

export { prepareParams }
