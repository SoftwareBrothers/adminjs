export enum PropertyPlace {
  show = 'show',
  list = 'list',
  edit = 'edit',
  filter = 'filter',
}

/**
 * JSON representation of a Property.
 */
export default interface PropertyJSON {
  /**
   * If given property should be treated as a title
   */
  isTitle: boolean;
  /**
   * If given property should be treaten as a Id field
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
   * Property type
   */
  type: string;
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
   * Contain list of all sub properties
   */
  subProperties: Array<PropertyJSON>;
  /**
   * All components overriden by the user in PropertyOptions
   */
  components?: {
    show?: string;
    edit?: string;
    filter?: string;
    list?: string;
  };
}
