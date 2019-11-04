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
   * Where given property schould be rendered
   */
  where: PropertyPlace;
  /**
   * callback function which should indicate change of the field value.
  */
  onChange?: OnPropertyChange;
  /**
   * Filter object taken from the query params. It is used on the _filter_ components.
   */
  filter?: any;
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
 * @alias BasePropertyEditProps
 * @extends BasePropertyProps
 */
export type PropertyProps = BasePropertyProps & {
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
 * On change callback - It takes either
 * one argument which is entire {@link RecordJSON} or 2 arguments - one
 * property.name and the second one: value. Used by the _edit_ and _filter_ components
 *
 * @memberof BasePropertyComponent
 * @alias OnPropertyChange
 */
export type OnPropertyChange = (
  propertyOrRecord: RecordJSON | string,
  value?: any,
  record?: RecordJSON,
) => void
