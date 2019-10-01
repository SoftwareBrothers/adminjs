import * as _ from 'lodash'
import AdminBro from '../../admin-bro'
import { PropertyOptions } from './property-options.interface'
import BaseResource from '../adapters/base-resource'
import BaseProperty from '../adapters/base-property'
import ResourceDecorator from './resource-decorator'
import PropertyJSON from './property-json.interface'

/**
 * Decorates property
 *
 * @category Decorators
 */
class PropertyDecorator {
  private _property: BaseProperty

  private _admin: AdminBro

  private _resource: ResourceDecorator

  public options: PropertyOptions

  /**
   * @param {Object} opts
   * @param {BaseProperty}        opts.property
   * @param  {AdminBro}           opts.admin  current instance of AdminBro
   * @param {PropertyOptions}     opts.options
   * @param {ResourceDecorator}   opts.resource
   */
  constructor({ property, admin, options = {}, resource }: {
    property: BaseProperty;
    admin: AdminBro;
    options: PropertyOptions;
    resource: ResourceDecorator;
  }) {
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
  isSortable(): boolean {
    return this._property.isSortable()
  }

  overrideFromOptions(optionName, defaultValue = null): any {
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
  reference(): BaseResource | null {
    return this._property.reference() && this._admin.findResource(this._property.reference())
  }

  /**
   * Name of the property
   *
   * @returns {String}
   */
  name(): string {
    return this.overrideFromOptions('name')
  }

  label(): string {
    return this.overrideFromOptions('label', () => (
      _.startCase(this._property.name())
    ))
  }

  /**
   * Resource type
   *
   * @returns {String}
   */
  type(): string {
    return this.overrideFromOptions('type')
  }

  availableValues(): null | Array<{value: string; label: string}> {
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
  isVisible(element): boolean {
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
  position(): number {
    return this.overrideFromOptions('position', () => (
      this.isTitle() ? -1 : 100
    ))
  }

  /**
   * If property should be treated as an ID field
   *
   * @return {Boolean}
   */
  isId(): boolean {
    return this.overrideFromOptions('isId')
  }

  /**
   * If property should be treated as an title field
   * Title field is used as a link to the resource page
   * in the list view and in the breadcrumbs
   *
   * @return {Boolean}
   */
  isTitle(): boolean {
    return this.overrideFromOptions('isTitle')
  }

  /**
   * Returns JSON representation of a property
   *
   * @return {BaseProperty~JSON}
   */
  toJSON(): PropertyJSON {
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

export default PropertyDecorator
