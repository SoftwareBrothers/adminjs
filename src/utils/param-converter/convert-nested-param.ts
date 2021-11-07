import { BasePropertyJSON } from '../../frontend/interfaces/property-json/property-json.interface'

import { DELIMITER } from './constants'
import { convertParam } from './convert-param'

const convertNestedParam = (
  parentValue: Record<string, any>,
  subProperty: BasePropertyJSON,
): Record<string, any> => {
  const path = subProperty.propertyPath.split(DELIMITER).slice(-1)[0]
  const { type = 'string' } = subProperty

  let value = parentValue[path]

  if (type === 'mixed') {
    const nestedSubProperties = subProperty.subProperties

    for (const nestedSubProperty of nestedSubProperties) {
      if (subProperty.isArray) {
        value = [...value].map(element => convertNestedParam(element, nestedSubProperty))
      } else {
        value = convertNestedParam(value, nestedSubProperty)
      }
    }
  } else {
    value = convertParam(value, subProperty.type)
  }

  return {
    ...parentValue,
    [path]: value,
  }
}

export { convertNestedParam }
