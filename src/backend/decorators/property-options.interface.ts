import { PropertyType } from '../adapters/base-property'

export enum AvailablePropertyOptions {
  name = 'name',
  isVisible = 'isVisible',
  components = 'components',
  type = 'type',
  label = 'label',
  isId = 'isId',
  isTitle = 'isTitle',
  position = 'position',
  availableValues = 'availableValues',
}

/**
 * Options passed to a given property
 */
export default interface PropertyOptions {
  /**
   * if given property shoyld be visible. It can be either boolean for all possible views, or
   * you can verify which view in particular should be hidden/shown.
   */
  isVisible?: boolean | {
    show?: boolean;
    list?: boolean;
    edit?: boolean;
    filter?: boolean;
  };
  /**
   * List of possible overriden components for given property.
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
   * Human readable label of a property
   */
  label?: string;
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
  availableValues?: Array<{ value: string; label: string }>;
}
