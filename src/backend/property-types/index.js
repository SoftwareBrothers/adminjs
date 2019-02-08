const string = require('./string')
const date = require('./date')
const datetime = require('./datetime')
const boolean = require('./boolean')
const richtext = require('./richtext')
const defaultType = require('./default-type')

/**
 * @typedef {Object} PropertyType
 * @property {PropertyType~RenderFunction} list   function which will render the list
 * @property {PropertyType~RenderFunction} show
 * @property {PropertyType~RenderFunction} edit
 * @property {PropertyType~RenderFilterFunction}  [filter]
 * @property {Object} [head]      files which should be loaded into the head of the page
 * @property {Array<String>} [head.scripts=[]]       scripts
 * @property {Array<String>} [head.styles=[]]        styles
 *
 * @typedef {Function} PropertyType~RenderFunction
 * @property {PropertyDecorator} property
 * @property {BaseRecord} record
 * @property {ViewHelper} h
 *
 * @typedef {Function} PropertyType~RenderFilterFunction
 * @property {PropertyDecorator} property
 * @property {Object} filter
 * @property {ViewHelper} h
 */

module.exports = {
  defaultType,
  string,
  date,
  datetime,
  boolean,
  richtext,
}
