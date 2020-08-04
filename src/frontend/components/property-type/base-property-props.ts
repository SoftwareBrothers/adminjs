import PropertyJSON, { PropertyPlace } from '../../../backend/decorators/property-json.interface'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

export type SelectRecord = {
  value: string;
  label: string;
}

/**
 * Props which are passed to all your custom property components
 *
 *
 * Example
 * ```
 * // AdminBroOptions
 * const AdminBro = require('admin-bro')
 * const ResourceModel = require('./resource-model')
 * const AdminBroOptions = {
 *   resources: [{
 *     resource: ResourceModel
 *     options: {
 *       properties: {
 *         name: {
 *           components: {
 *             show: AdminBro.bundle('./my-react-component'),
 *           },
 *         },
 *       },
 *     },
 *   }],
 * }
 *
 * // my-react-component.tsx
 * const MyReactComponent = (props: BasePropertyProps) => {
 *   const { record, property } = props
 *   const value = record.params[property.name] === 'foo' ? 'bar' : 'zoe'
 *   return (
 *     <PropertyInShow property={property}>
 *       {value}
 *     </PropertyInShow>
 *   )
 * }
 *
 * ```
 *
 * @memberof BasePropertyComponent
 * @alias BasePropertyProps
 */
export type BasePropertyProps = {
  /**
   * Property JSON representation
   */
  property: PropertyJSON;
  /**
   * Resource JSON representation
   */
  resource: ResourceJSON;
  /**
   * Record JSON representation. Null for filter
   */
  record?: RecordJSON;
  /**
   * callback function which should indicate change of the field value. You can use it
   * when overriding edit properties.
  */
  onChange?: OnPropertyChange;
  /**
   * Filter object taken from the query params. It is used on the _filter_ components.
   */
  filter?: any;
  /**
   * Where given property should be rendered. Either of 'show' | 'list' | 'edit' | 'filter'.
   */
  where: PropertyPlace;
}

/**
 * Props which are passed to all your custom property components in filter
 *
 * @memberof BasePropertyComponent
 * @alias BasePropertyFilterProps
 * @extends BasePropertyProps
 */
export type FilterPropertyProps = BasePropertyProps & {
  /**
   * Filter object taken from the query params. It is used on the _filter_ components
   */
  filter: any;
  /**
   * callback function which should indicate change of the filter value.
  */
  onChange: OnPropertyChange;
  record: undefined;
}

/**
 * Props which are passed to all your custom property components in show
 *
 * @memberof BasePropertyComponent
 * @alias EditPropertyProps
 * @extends BasePropertyProps
 */
export type EditPropertyProps = BasePropertyProps & {
  /**
   * callback function which should indicate change of the field value.
  */
  onChange: OnPropertyChange;
  /**
   * Record JSON representation. Null for filter
   */
  record: RecordJSON;
}

/**
 * Props which are passed to all your custom property components in show
 *
 * @memberof BasePropertyComponent
 * @alias BasePropertyEditProps
 * @extends BasePropertyProps
 */
export type ShowPropertyProps = {
  /**
   * Property JSON representation
   */
  property: PropertyJSON;
  /**
   * Resource JSON representation
   */
  resource: ResourceJSON;
  /**
   * Record JSON representation. Null for filter
   */
  record: RecordJSON;
}


/**
 * On change callback - It takes either
 * one argument which is entire {@link RecordJSON} or 2 arguments - one
 * __property.name__ and the second one: __value__. Used by the __edit__ and __filter__ components.
 *
 * Lets take a look at an example of overriding edit component:
 * ```typescript
 * import React, { ReactNode } from 'react'
 * import { BasePropertyProps, PropertyInEdit, StyledInput } from 'admin-bro'
 *
 * export default class Edit extends React.Component<PropertyProps> {
 *   constructor(props) {
 *     super(props)
 *     this.handleInputChange = this.handleInputChange.bind(this)
 *   }
 *
 *   handleInputChange(event): void {
 *     const { onChange, property, record } = this.props
 *
 *     // Here is the interesting part:
 *     onChange(property.name, event.target.value)
 *
 *     // or you can pass an entire record. This is the same as above but gives you
 *     // much more flexibility
 *     const newRecord = { ...record }
 *     newRecord.params[property.name] = event.target.value
 *     onChange(newRecord)
 *   }
 *
 *   render(): ReactNode {
 *     const { property, record } = this.props
 *     const error = record.errors && record.errors[property.name]
 *     const value = (record.params && typeof record.params[property.name] !== 'undefined')
 *       ? record.params[property.name]
 *       : ''
 *     return (
 *       <PropertyInEdit property={property} error={error}>
 *         <StyledInput
 *           type="text"
 *           className="input"
 *           id={property.name}
 *           name={property.name}
 *           onChange={this.handleInputChange}
 *           value={value}
 *         />
 *       </PropertyInEdit>
 *     )
 *   }
 * }
 * ```
 *
 * @memberof BasePropertyComponent
 * @alias OnPropertyChange
 */
export type OnPropertyChange = (
  /**
   * property.name or updated RecordJSON object
   */
  propertyOrRecord: RecordJSON | string,
  /**
   * when propertyOrRecord is a property.name, here should be an updated value.
   */
  value?: any,
  /**
   * In case of "reference" fields (with select), when they change they pass selected record object.
   * This is mostly for an internal use - you probably wont have to use that.
   */
  selectedRecord?: RecordJSON,
) => void
