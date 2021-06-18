import React from 'react'
import { RecordJSON, ResourceJSON, PropertyJSON, PropertyPlace } from '../../interfaces'
import { BasePropertyJSON } from '../../interfaces/property-json/property-json.interface'

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
 * // AdminJSOptions
 * const AdminJS = require('adminjs')
 * const ResourceModel = require('./resource-model')
 * const AdminJSOptions = {
 *   resources: [{
 *     resource: ResourceModel
 *     options: {
 *       properties: {
 *         name: {
 *           components: {
 *             show: AdminJS.bundle('./my-react-component'),
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
 *   const value = record.params[property.path] === 'foo' ? 'bar' : 'zoe'
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

export type BasePropertyComponentProps = Omit<BasePropertyProps, 'property'> & {
  property: BasePropertyJSON;
}

export type BasePropertyPropsExtended = BasePropertyProps & {
  ItemComponent: typeof React.Component;
  testId: string;
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

export type EditPropertyPropsInArray = EditPropertyProps & {
  ItemComponent: typeof React.Component;
  testId: string;
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
 * @load ./docs/on-property-change.doc.md
 * @memberof BasePropertyComponent
 * @alias OnPropertyChange
 */
export type OnPropertyChange = (
  /**
   * property.path or updated RecordJSON object
   */
  propertyOrRecord: RecordJSON | string,
  /**
   * when propertyOrRecord is a property.path, here should be an updated value.
   */
  value?: any,
  /**
   * In case of "reference" fields (with select), when they change they pass selected record object.
   * This is mostly for an internal use - you probably wont have to use that.
   */
  selectedRecord?: RecordJSON,
) => void
