const _ = require('lodash')
const ViewHelpers = require('../utils/view-helpers')

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

  /**
   * Returns {@link PropertyType} for a given property. It property type
   * is defined returns it, otherwise it returns default PropertyType
   *
   * @returns {PropertyType}
   * @private
   */
  propertyType() {
    const { PROPERTY_TYPES } = this._admin.constructor
    const type = PROPERTY_TYPES[this.type()] ? this.type() : 'defaultType'
    return PROPERTY_TYPES[type]
  }

  /**
   * Renders field either in view, edit, list pages or in filter. When user passed render function
   * in options it is passed to it, otherwise use one function from available
   * {@link PropertyType PropertyTypes}
   *
   * @param {String} where            one of 'view', 'edit', 'list', 'filter'
   * @param {BaseRecord | Object} recordOrFilters
   * @returns {String}                html string which should be rendered in a "where"
   * @private
   *
   * @example
   * render('filter', filters)
   * render('show', record)
   */
  render(where, recordOrFilters) {
    const helpers = new ViewHelpers({ admin: this._admin })
    if (this.options.render && this.options.render[where]) {
      return this.options.render[where](this, recordOrFilters, helpers)
    }
    return this.propertyType()[where](this, recordOrFilters, helpers)
  }

  /**
   * Returns scripts which should be included in the head for given property type.
   *
   * @see PropertyType
   * @returns {Array<String>}
   */
  headScripts() {
    let head
    if (this.options.render && this.options.render.head) {
      ({ head } = this.options.render)
    } else {
      ({ head } = this.propertyType())
    }
    return head
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
   * Renders element of given property as a list element
   * @param {BaseRecord} record
   * @return {String} HTML of an element
   */
  renderList(record) {
    return this.render('list', record)
  }

  /**
   * Renders element of given property in a show view
   * @param {BaseRecord} record
   * @return {String} HTML of an element
   */
  renderShow(record) {
    return this.render('show', record)
  }

  /**
   * Renders element of given property in a edit view
   * @param {BaseRecord} record
   * @return {String} HTML of an element
   */
  renderEdit(record) {
    return this.render('edit', record)
  }

  /**
   * Renders element of given property in a filter box
   * @param {Options} [filters={}] already selected filters
   * @return {String} HTML of an element
   */
  renderFilter(filters = {}) {
    return this.render('filter', filters)
  }

  /**
   * If property should be treated as an ID field
   *
   * @return {Boolean}
   */
  isId() {
    if (typeof this.options.isId === 'undefined') {
      return this._property.isId()
    }
    return this.options.isId
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
      name: this.name(),
      label: this.label(),
      type: this.type(),
      isVisible: this.isVisible(),
      reference: this._property.reference(),
    }
  }
}

module.exports = PropertyDecorator
