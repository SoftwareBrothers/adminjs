import { PropertyType } from '../../adapters/property/base-property'

/**
 * Options passed to a given property
 */
export default interface PropertyOptions {
  /**
   * if given property should be visible. It can be either boolean for all possible views, or
   * you can verify which view in particular should be hidden/shown.
   */
  isVisible?: boolean | {
    show?: boolean;
    list?: boolean;
    edit?: boolean;
    filter?: boolean;
  };
  /**
   * Property type
   */
  type?: PropertyType;
  /**
   * Indicates if property should be treated as an ID
   */
  isId?: boolean;
  /**
   * One of given property should be treated as an "title property". Title property is "clickable"
   * when user sees the record in a list or show views.
   */
  isTitle?: boolean;

  /**
   * Indicates if given property should be treated as array of elements.
   */
  isArray?: boolean;

  /**
   * position of the field in a list,
   * title field (isTitle) gets position -1 by default other
   * fields gets position = 100.
   */
  position?: number;

  /**
   * If options should be limited to finite set. After setting this
   * in the UI you will see select box instead of the input
   */
  availableValues?: Array<{
    value: string | number;
    label: string;
  }>;

  /**
   * Whether given property should be editable or not.
   */
  isDisabled?: boolean;

  /**
   * Whether given property should be sortable on list or not.
   */
  isSortable?: boolean;

  /**
   * Whether given property should be marked as required.
   */
  isRequired?: boolean;

  /**
   * Name of the resource to which this property should be a reference.
   * If set - {@link PropertyOptions.type} always returns `reference`
   * @new In version 3.3
   */
  reference?: string;
}
