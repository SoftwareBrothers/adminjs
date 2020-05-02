import { PropertyType } from '../adapters/base-property'

export enum AvailablePropertyOptions {
  name = 'name',
  isVisible = 'isVisible',
  components = 'components',
  type = 'type',
  isId = 'isId',
  isTitle = 'isTitle',
  position = 'position',
  availableValues = 'availableValues',
  isSortable = 'isSortable',
  isRequired = 'isRequired'
}

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
   * List of possible overridden components for given property.
   */
  components?: {
    show?: string;
    list?: string;
    edit?: string;
    filter?: string;
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
   * Of given property should be treated as an "title property". Title property is "clickable" when
   * user sees the record in a list or show views.
   */
  isTitle?: boolean;
  /**
   * position of the field in a list,
   * title field (isTitle) gets position -1 by default other
   * fields gets position = 100.
   */
  position?: number;

  /**
   * Name of the property
   */
  name?: string;

  /**
   * If options should be limited to finite set. After setting this
   * in the UI you will see select box instead of the input
   */
  availableValues?: Array<{
    value: string;
    label: string;
  }>;

  /**
   * Custom properties passed to the frontend in {@link PropertyJSON}
   */
  custom?: {
    [key: string]: any;
  };

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
}
