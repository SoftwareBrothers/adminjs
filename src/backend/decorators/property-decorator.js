const _ = require('lodash')

/**
 * @typedef  {Object}  PropertyOptions
 * @property {Boolean | Object } [isVisible]
 * @property {Boolean} [isVisible.show]
 * @property {Boolean} [isVisible.list]
 * @property {Boolean} [isVisible.edit]
 * @property {Boolean} [isVisible.filter]
 * @property {Object} [components]
 * @property {Component} [components.show]
 * @property {Component} [components.view]
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

/**
 * Decorates property
 *
 * @category Decorators
 */
class PropertyDecorator {
  /** @typedef {import('./resource-decorator')} ResourceDecorator */
  /** @typedef {import('../../admin-bro')} AdminBro */

  /**
   * @param {Object} opts
   * @param {BaseProperty}        opts.property
   * @param  {AdminBro}           opts.admin  current instance of AdminBro
   * @param {PropertyOptions}     opts.options
   * @param {ResourceDecorator}   opts.resource
   */
  constructor({ property, admin, options = {}, resource }) {
    this._property = property
    this._admin = admin
    this._resource = resource

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

  overrideFromOptions(optionName, defaultValue = null) {
    if (typeof this.options[optionName] === 'undefined') {
      if (defaultValue) {
        return defaultValue()
      }
      return this._property[optionName]()
    }
    return this.options[optionName]
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
    return this.overrideFromOptions('name')
  }

  label() {
    return this.overrideFromOptions('label', () => (
      _.startCase(this._property.name())
    ))
  }

  /**
   * Resource type
   *
   * @returns {String}
   */
  type() {
    return this.overrideFromOptions('type')
  }

  availableValues() {
    return this.overrideFromOptions('availableValues', () => {
      const values = this._property.availableValues()
      if (values) {
        return values.map(val => ({ value: val, label: val }))
      }
      return null
    })
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
    return this.overrideFromOptions('position', () => (
      this.isTitle() ? -1 : 100
    ))
  }

  /**
   * If property should be treated as an ID field
   *
   * @return {Boolean}
   */
  isId() {
    return this.overrideFromOptions('isId')
  }

  /**
   * If property should be treated as an title field
   * Title field is used as a link to the resource page
   * in the list view and in the breadcrumbs
   *
   * @return {Boolean}
   */
  isTitle() {
    return this.overrideFromOptions('isTitle')
  }

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
   * @property {String} reference
   * @property {Boolean} isArray=false
   * @property {Array<BaseProperty~JSON>} subProperties=[]
   * @property {Object} [components]
   * @property {Component} [components.show]
   * @property {Component} [components.edit]
   * @property {Component} [components.filter]
   * @property {Component} [components.list]
   */

  /**
   * Returns JSON representation of a property
   *
   * @return {BaseProperty~JSON}
   */
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
      subProperties: this._property.subProperties().map((subProperty) => {
        const optionKey = `${this._property.name()}.${subProperty.name()}`
        const decorated = new PropertyDecorator({
          property: subProperty,
          admin: this._admin,
          options: (this._resource.options.properties)[optionKey],
          resource: this._resource,
        })
        return decorated.toJSON()
      }),
      isArray: this._property.isArray(),
    }
  }
}

module.exports = PropertyDecorator
