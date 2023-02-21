import { ParamsTypeValue } from '../../backend/adapters/record/params.type.js'
import { BaseProperty } from '../../backend/adapters/property/index.js'
import PropertyDecorator from '../../backend/decorators/property/property-decorator.js'

const isNumeric = (value: ParamsTypeValue) => !Number.isNaN(value)
const isUuid = (value: ParamsTypeValue) => {
  const rgx = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

  return rgx.test(String(value))
}
const isSafeInteger = (
  value: ParamsTypeValue,
) => isNumeric(value) && Number.isSafeInteger(Number(value))
const isPositiveNumber = (
  value: ParamsTypeValue,
) => isNumeric(value) && Number(value) > 0

const validateParam = (
  value: ParamsTypeValue,
  property: BaseProperty | PropertyDecorator,
): boolean => {
  if (property.type() === 'number' || property.type() === 'float') {
    if (!property.isId()) return isNumeric(value)
    if (property.type() === 'float') return isPositiveNumber(value)
    return isSafeInteger(value) && isPositiveNumber(value)
  }

  if (property.type() === 'uuid') {
    return isUuid(value)
  }

  return true
}

export { validateParam, isNumeric, isUuid, isSafeInteger }
