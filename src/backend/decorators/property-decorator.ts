import * as _ from 'lodash'
import AdminBro from '../../admin-bro'
import PropertyOptions, { AvailablePropertyOptions } from './property-options.interface'
import BaseResource from '../adapters/base-resource'
import BaseProperty, { PropertyType } from '../adapters/base-property'
import ResourceDecorator from './resource-decorator'
import PropertyJSON from './property-json.interface'

/**
 * Decorates property
 *
 * @category Decorators
 */
class PropertyDecorator {
  public property: BaseProperty

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
    options?: PropertyOptions;
    resource: ResourceDecorator;
  }) {
    this.property = property
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
   * @returns {boolean}
   */
  isSortable(): boolean {
    return this.property.isSortable()
  }

  overrideFromOptions<T>(
    optionName: AvailablePropertyOptions,
    defaultValue?: () => T,
  ): T {
    if (typeof this.options[optionName] === 'undefined') {
      if (defaultValue) {
        return defaultValue()
      }
      return this.property[optionName]()
    }
    return this.options[optionName] as T
  }

  /**
   * When given property is a reference to another Resource - it returns this Resource
   *
   * @return  {BaseResource} reference resource
   */
  reference(): BaseResource | null {
    const referenceResourceId = this.property.reference()
    if (referenceResourceId) {
      const resource = this._admin.findResource(referenceResourceId)
      return resource
    }
    return null
  }

  /**
   * Name of the property
   *
   * @returns {string}
   */
  name(): string {
    return this.overrideFromOptions(AvailablePropertyOptions.name)
  }

  /**
   * Label of a property
   *
   * @return  {string}
   */
  label(): string {
    return this.overrideFromOptions(AvailablePropertyOptions.label, () => (
      _.startCase(this.property.name())
    ))
  }

  /**
   * Property type
   *
   * @returns {PropertyType}
   */
  type(): PropertyType {
    return this.overrideFromOptions(AvailablePropertyOptions.type)
  }

  /**
   * If given property has limited number of available values
   * it returns them.
   *
   * @returns {Array<{value: string, label: string}>}
   */
  availableValues(): null | Array<{value: string; label: string}> {
    return this.overrideFromOptions(AvailablePropertyOptions.availableValues, () => {
      const values = this.property.availableValues()
      if (values) {
        return values.map(val => ({ value: val, label: val }))
      }
      return null
    })
  }

  /**
   * Indicates if given property should be visible
   *
   * @param {boolean} element      it could be either "list", "edit" or "show"
   */
  isVisible(element): boolean {
    if (typeof this.options.isVisible === 'object') {
      return this.options.isVisible[element]
    }
    if (typeof this.options.isVisible === 'boolean') {
      return this.options.isVisible
    }
    if (element === 'edit') {
      return this.property.isEditable()
    }
    return this.property.isVisible()
  }

  // TODO: add option to pass function to isVisible

  /**
   * Position of the field
   *
   * @return {number}
   */
  position(): number {
    return this.overrideFromOptions(AvailablePropertyOptions.position, () => {
      if (this.isTitle()) { return -1 }
      if (this.isId()) { return 0 }
      return 100
    })
  }

  /**
   * If property should be treated as an ID field
   *
   * @return {boolean}
   */
  isId(): boolean {
    return !!this.overrideFromOptions(AvailablePropertyOptions.isId)
  }

  /**
   * If property should be treated as an title field
   * Title field is used as a link to the resource page
   * in the list view and in the breadcrumbs
   *
   * @return {boolean}
   */
  isTitle(): boolean {
    return !!this.overrideFromOptions(AvailablePropertyOptions.isTitle)
  }

  /**
   * Returns JSON representation of a property
   *
   * @return {PropertyJSON}
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
      reference: this.property.reference(),
      components: this.options.components,
      subProperties: this.property.subProperties().map((subProperty) => {
        const optionKey = `${this.property.name()}.${subProperty.name()}`
        const decorated = new PropertyDecorator({
          property: subProperty,
          admin: this._admin,
          options: this._resource.options
                   && this._resource.options.properties
                   && this._resource.options.properties[optionKey],
          resource: this._resource,
        })
        return decorated.toJSON()
      }),
      isArray: this.property.isArray(),
    }
  }
}

export default PropertyDecorator
