const ViewHelpers = require('../utils/view-helpers')

/**
 * @typedef  {Object}  PropertyOptions
 * @property {Boolean | Object } isVisible
 * @property {Boolean} [isVisible.show]
 * @property {Boolean} [isVisible.list]
 * @property {Boolean} [isVisible.edit]
 * @property {PropertyType} render
 * @property {String} type
 * @property {Boolean} isId
 * @property {Boolean} isTitle
 */

/**
 * Decorates property
 */
class PropertyDecorator {
  /**
   * @param {BaseProperty} property
   * @param  {AdminBro}     options.admin  current instance of AdminBro
   * @param {PropertyOptions} options
   */
  constructor({ property, admin, options = {} }) {
    this._property = property
    this._admin = admin
    this.options = options
  }

  isSortable() {
    return this._property.isSortable()
  }

  name() {
    return this._property.name()
  }

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
   * returns scripts which should be included in the head for given property type
   *
   * @returns {Array<String>}
   */
  headScripts() {
    let head
    if (this.options.render && this.options.render.head) {
      head = this.options.render.head
    } else {
      head = this.propertyType().head
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
    return element === 'edit' ? this._property.isEditable() : this._property.isVisible()
  }

  /**
   * Position of the field
   *
   * @returns {Number}
   * @memberof PropertyDecorator
   */
  position() {
    if (typeof this.options.position === 'number') {
      return this.options.position
    }
    // when field is a title its position should be -1 -> first on the list.
    return this.isTitle() ? -1 : 100
  }

  renderList(record) {
    return this.render('list', record)
  }

  renderShow(record) {
    return this.render('show', record)
  }

  renderEdit(record) {
    return this.render('edit', record)
  }

  renderFilter(filters = {}) {
    return this.render('filter', filters)
  }

  isId() {
    if (typeof this.options.isId === 'undefined') {
      return this._property.isId()
    }
    return this.options.isId
  }

  isTitle() {
    if (typeof this.options.isTitle === 'undefined') {
      return this._property.isTitle()
    }
    return this.options.isTitle
  }
}

module.exports = PropertyDecorator
