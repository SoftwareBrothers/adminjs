const _ = require('lodash')

/**
 * @typedef  {Object}  PropertyOptions
 * @property {Boolean | Object } isVisible
 * @property {Boolean} [isVisible.show]
 * @property {Boolean} [isVisible.list]
 * @property {Boolean} [isVisible.edit]
 * @property {Boolean} [isVisible.filter]
 * @property {PropertyType} render
 * @property {String} type
 * @property {String} label
 * @property {Boolean} isId
 * @property {Boolean} isTitle
 * @property {Number} position          position of the field in a list,
 *                                      title field (isTitle) gets position -1 by default other
 *                                      fields gets position = 100.
 */
/**
 * @typedef {Object} PropertyType
 * @property {RenderFunction} list   function which will render the list
 * @property {RenderFunction} show
 * @property {RenderFunction} edit
 * @property {RenderFilterFunction}  [filter]
 * @property {Object} [head]      files which should be loaded into the head of the page
 * @property {Array<String>} [head.scripts=[]]       scripts
 * @property {Array<String>} [head.styles=[]]        styles
*/
/**
 * @typedef {Function} RenderFunction
 * @property {PropertyDecorator} property
 * @property {BaseRecord} record
 * @property {ViewHelpers} h
*/
/**
 * @typedef {Function} RenderFilterFunction
 * @property {PropertyDecorator} property
 * @property {Object} filter
 * @property {ViewHelpers} h
 */

/**
 * Decorates property
 *
 * @category Decorators
 */
class PropertyDecorator {
  /**
   * @param {BaseProperty} property
   * @param  {AdminBro}     admin  current instance of AdminBro
   * @param {PropertyOptions} options
   */
  constructor({ property, admin, options = {} }) {
    this._property = property
    this._admin = admin

    /**
     * Options passed along with a given resource
     * @type {PropertyOptions}
    */
    this.options = options
  }

  /**
   * True if given property can be sortable
   *
   * @returns {Boolean}
   */
  isSortable() {
    return this._property.isSortable()
  }

  /**
   * When given property is a reference to another Resource - it returns this Resource
   *
   * @return  {BaseResource} reference resource
   */
  reference() {
    return this._property.reference() && this._admin.findResource(this._property.reference())
  }

  /**
   * Name of the property
   *
   * @returns {String}
   */
  name() {
    if (typeof this.options.name === 'undefined') {
      return this._property.name()
    }
    return this.options.name
  }

  label() {
    if (typeof this.options.label === 'undefined') {
      return _.startCase(this._property.name())
    }
    return this.options.label
  }

  /**
   * Resource type
   *
   * @returns {String}
   */
  type() {
    if (typeof this.options.type === 'undefined') {
      return this._property.type()
    }
    return this.options.type
  }

  availableValues() {
    if (typeof this.options.availableValues === 'undefined') {
      const values = this._property.availableValues()
      if (values) {
        return values.map(val => ({ value: val, label: val }))
      }
      return null
    }
    return this.options.availableValues
  }

  /**
   * Indicates if given property should be visible
   *
   * @param {String} element      it could be either "list", "edit" or "show"
   */
  isVisible(element) {
    if (typeof this.options.isVisible === 'object') {
      return this.options.isVisible[element]
    }
    if (typeof this.options.isVisible === 'boolean') {
      return this.options.isVisible
    }
    if (element === 'edit') {
      return this._property.isEditable()
    }
    return this._property.isVisible()
  }

  /**
   * Position of the field
   *
   * @return {Number}
   */
  position() {
    if (typeof this.options.position === 'number') {
      return this.options.position
    }
    // when field is a title its position should be -1 -> first on the list.
    return this.isTitle() ? -1 : 100
  }

  /**
   * If property should be treated as an ID field
   *
   * @return {Boolean}
   */
  isId() {
    if (typeof this.options.isId === 'undefined') {
      return !!this._property.isId()
    }
    return !!this.options.isId
  }

  /**
   * If property should be treated as an title field
   * Title field is used as a link to the resource page
   * in the list view and in the breadcrumbs
   *
   * @return {Boolean}
   */
  isTitle() {
    if (typeof this.options.isTitle === 'undefined') {
      return this._property.isTitle()
    }
    return this.options.isTitle
  }

  toJSON() {
    return {
      isTitle: this.isTitle(),
      isId: this.isId(),
      position: this.position(),
      isSortable: this.isSortable(),
      availableValues: this.availableValues(),
      name: this.name(),
      label: this.label(),
      type: this.type(),
      reference: this._property.reference(),
      components: this.options.components,
    }
  }
}

module.exports = PropertyDecorator
