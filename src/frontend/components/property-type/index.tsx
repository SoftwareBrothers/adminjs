import BasePropertyComponent from './base-property-component'
import * as defaultType from './default-type'
import * as boolean from './boolean'
import * as datetime from './datetime'
import * as richtext from './richtext'
import * as reference from './reference'
import * as textarea from './textarea'
import * as password from './password'
import * as currency from './currency'
import * as phone from './phone'
import { BasePropertyComponentProps } from './base-property-props'

type BasePropertyComponentType = React.FC<BasePropertyComponentProps> & {
  DefaultType: any;
  Boolean: any;
  DateTime: any;
  RichText: any;
  Reference: any;
  TextArea: any;
  Password: any;
}

function camelizePropertyType<T>(type: {[key: string]: T}): {[key: string]: T} {
  return {
    Edit: type.edit,
    Show: type.show,
    List: type.list,
    Filter: type.filter,
  }
}

const BasePropertyComponentExtended: BasePropertyComponentType = Object.assign(
  BasePropertyComponent, {
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
}

export * from './base-property-props'
export * from './utils'
