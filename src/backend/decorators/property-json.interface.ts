import { PropertyType } from '../adapters/base-property'

export type PropertyPlace = 'show' | 'list' | 'edit' | 'filter';

/**
 * JSON representation of a Property.
 * @subcategory Frontend
 */
export default interface PropertyJSON {
  /**
   * If given property should be treated as a title
   */
  isTitle: boolean;
  /**
   * If given property should be treated as a Id field
   */
  isId: boolean;
  /**
   * Property position on a list
   */
  position: number;
  /**
   * If property is sortable
   */
  isSortable: boolean;
  /**
   * If property has restricted number of values
   */
  availableValues: Array<{label: string; value: string}> | null;
  /**
   * Property uniq name/path
   */
  name: string;
  /**
   * Property label
   */
  label: string;
  /**
   * One of {@link PropertyType}s
   */
  type: PropertyType;
  /**
   * Has a name of a resource to which it is a reference.
   * For instance property `userId` will have here `Users`
   */
  reference: string | null;
  /**
   * Indicates if property is an array of properties
   */
  isArray: boolean;
  /**
   * Contain list of all sub properties.
   * This is the case for nested schemas in MongoDB.
   */
  subProperties: Array<PropertyJSON>;
  /**
   * All component names overridden by the user in PropertyOptions
   */
  components?: {
    show?: string;
    edit?: string;
    filter?: string;
    list?: string;
  };

  /**
   * Custom parameters passed from the {@link PropertyOptions.custom}.
   */
  custom: {
    [key: string]: any;
  };

  /**
   * Whether the field should be disabled in edition
   */
  isDisabled: boolean;

  /**
   * Whether the field should be marked as required (with a star)
   */
  isRequired: boolean;

  /**
   * Resource to which given property belongs
   */
  resourceId: string;
}
