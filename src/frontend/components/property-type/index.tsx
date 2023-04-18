import BasePropertyComponent from './base-property-component.js'
import CleanPropertyComponent from './clean-property-component.js'
import * as defaultType from './default-type/index.js'
import * as boolean from './boolean/index.js'
import * as datetime from './datetime/index.js'
import * as richtext from './richtext/index.js'
import * as reference from './reference/index.js'
import * as textarea from './textarea/index.js'
import * as password from './password/index.js'
import * as currency from './currency/index.js'
import * as phone from './phone/index.js'
import { BasePropertyComponentProps } from './base-property-props.js'

type BasePropertyComponentType = React.FC<BasePropertyComponentProps> & {
  DefaultType: any
  Boolean: any
  DateTime: any
  RichText: any
  Reference: any
  TextArea: any
  Password: any
}

function camelizePropertyType<T>(type: { [key: string]: T }): { [key: string]: T } {
  return {
    Edit: type.edit,
    Show: type.show,
    List: type.list,
    Filter: type.filter,
  }
}

const BasePropertyComponentExtended: BasePropertyComponentType = Object.assign(
  BasePropertyComponent,
  {
    DefaultType: camelizePropertyType(defaultType),
    Boolean: camelizePropertyType(boolean),
    DateTime: camelizePropertyType(datetime),
    RichText: camelizePropertyType(richtext),
    Reference: camelizePropertyType(reference),
    TextArea: camelizePropertyType(textarea),
    Password: camelizePropertyType(password),
    Currency: camelizePropertyType(currency),
    Phone: camelizePropertyType(phone),
  },
)

export {
  BasePropertyComponentExtended as default,
  BasePropertyComponentExtended as BasePropertyComponent,
  CleanPropertyComponent,
}

export * from './base-property-props.js'
export * from './utils/index.js'
