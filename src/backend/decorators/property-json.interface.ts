/**
 * @typedef {Object} BaseProperty~JSON
 * @property {Boolean} isTitle
 * @property {Boolean} isId
 * @property {Number}  position
 * @property {Boolean} isSortable
 * @property {Array | null} availableValues
 * @property {String} name
 * @property {String} label
 * @property {String} type
 * @property {String | null} reference
 * @property {Boolean} isArray=false
 * @property {Array<BaseProperty~JSON>} subProperties=[]
 * @property {Object} [components]
 * @property {Component} [components.show]
 * @property {Component} [components.edit]
 * @property {Component} [components.filter]
 * @property {Component} [components.list]
 */

export default interface PropertyJSON {
  isTitle: boolean;
  isId: boolean;
  position: number;
  isSortable: boolean;
  availableValues: Array<{label: string; value: string}> | null;
  name: string;
  label: string;
  type: string;
  reference: string | null;
  isArray: boolean;
  subProperties: Array<PropertyJSON>;
  components?: {
    show?: string;
    edit?: string;
    filter?: string;
    list?: string;
  };
}
