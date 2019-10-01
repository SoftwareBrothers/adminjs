/**
 * @typedef {Object} BaseAction~JSON
 * @description JSON representation of an {@link Action}
 * @property {String} name
 * @property {String | Array<String>} actionType one of 'record' 'resource or
 *                                               an array containing both
 * @property {String} icon
 * @property {String} label
 * @property {String} [guard]
 * @property {String} [component]
 */

export default interface ActionJSON {
  name: string;
  actionType: 'record' | 'resource' | Array<'record' | 'resource'>;
  icon: string;
  label: string;
  guard?: string;
  showFilter: boolean;
  component?: string;
}
