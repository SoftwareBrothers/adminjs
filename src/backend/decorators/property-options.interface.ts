/**
 * @typedef  {Object}  PropertyOptions
 * @property {Boolean | Object } [isVisible]
 * @property {Boolean} [isVisible.show]
 * @property {Boolean} [isVisible.list]
 * @property {Boolean} [isVisible.edit]
 * @property {Boolean} [isVisible.filter]
 * @property {Object} [components]
 * @property {Component} [components.show]
 * @property {Component} [components.list]
 * @property {Component} [components.edit]
 * @property {Component} [components.filter]
 * @property {String} [type]
 * @property {String} [label]
 * @property {Boolean} [isId]
 * @property {Boolean} [isTitle]
 * @property {Number} [position]          position of the field in a list,
 *                                      title field (isTitle) gets position -1 by default other
 *                                      fields gets position = 100.
 */

export interface PropertyOptions {
  isVisible?: Boolean | {
    show?: Boolean,
    list?: Boolean,
    edit?: Boolean,
    filter?: Boolean,
  },
  components?: {
    show?: Map<string, string>,
    list?: Map<string, string>,
    edit?: Map<string, string>,
    filter?: Map<string, string>,
  },
  type?: string,
  label?: string,
  isId?: Boolean,
  isTitle?: Boolean,
  position?: Number,
}