// TODO narrow down the property types to list we support

/**
 * Options passed to a given property
 */
export interface PropertyOptions {
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
  type?: string;
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
}
