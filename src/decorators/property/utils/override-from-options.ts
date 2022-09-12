import { BaseProperty } from '../../../adapters'
import PropertyOptions from '../property-options.interface'

export type OverridableFromOptionsType = keyof Pick<BaseProperty,
  'isSortable' |
  'type' |
  'isId' |
  'isRequired' |
  'isTitle'
>

export function overrideFromOptions<T extends OverridableFromOptionsType>(
  optionName: T,
  property: BaseProperty,
  options: PropertyOptions,
): ReturnType<BaseProperty[OverridableFromOptionsType]> | null | undefined {
  if (typeof options[optionName] === 'undefined') {
    return property[optionName]()
  }
  return options[optionName]
}
