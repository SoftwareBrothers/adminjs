import AdminJS from '../../../adminjs.js'
import { BasePropertyJSON, PropertyPlace } from '../../../frontend/interfaces/index.js'
import BaseProperty, { PropertyType } from '../../adapters/property/base-property.js'
import BaseResource from '../../adapters/resource/base-resource.js'
import ResourceDecorator from '../resource/resource-decorator.js'
import PropertyOptions from './property-options.interface.js'
import { overrideFromOptions } from './utils/override-from-options.js'

/**
 * Decorates property
 *
 * @category Decorators
 */
export class PropertyDecorator {
  public property: BaseProperty

  /**
   * Property path including all parents.
   * For root property (this without a parent) it will be its name.
   * But when property has children their paths will include parent path:
   * `parentName.subPropertyName`.
   *
   * This path serves as a key in {@link PropertyOptions} to identify which
   * property has to be updated
   */
  public propertyPath: string

  /**
   * Indicates if given property has been created in AdminJS and hasn't been returned by the
   * database adapter
   */
  public isVirtual: boolean

  private _admin: AdminJS

  private _resource: ResourceDecorator

  public options: PropertyOptions

  /**
   * Array of all subProperties which were added in {@link ResourceOption} interface rather than
   * in the database
   *
   * @private
   */
  private virtualSubProperties: Array<PropertyDecorator>

  /**
   * @param {Object} opts
   * @param {BaseProperty}        opts.property
   * @param  {AdminJS}           opts.admin  current instance of AdminJS
   * @param {PropertyOptions}     opts.options
   * @param {ResourceDecorator}   opts.resource
   */
  constructor({ property, admin, options = {}, resource, path, isVirtual }: {
    property: BaseProperty;
    admin: AdminJS;
    options?: PropertyOptions;
    resource: ResourceDecorator;
    path?: string;
    isVirtual?: boolean;
  }) {
    this.property = property
    this._admin = admin
    this._resource = resource
    this.propertyPath = path || property.name()
    this.isVirtual = !!isVirtual
    this.virtualSubProperties = []

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
    return !!overrideFromOptions('isSortable', this.property, this.options)
  }

  /**
   * When given property is a reference to another Resource - it returns this Resource
   *
   * @return  {BaseResource} reference resource
   */
  reference(): BaseResource | null {
    const referenceResourceId = this.referenceName()
    if (referenceResourceId) {
      const resource = this._admin.findResource(referenceResourceId)
      return resource
    }
    return null
  }

  referenceName(): string | null {
    return this.options.reference || this.property.reference()
  }

  /**
   * Name of the property
   *
   * @returns {string}
   */
  name(): string {
    return this.property.name()
  }

  /**
   * Resource decorator of given property
   */
  resource(): ResourceDecorator {
    return this._resource
  }

  /**
   * Label of a property
   *
   * @return  {string}
   */
  label(): string {
    return this.propertyPath
  }

  /**
   * Property type
   *
   * @returns {PropertyType}
   */
  type(): PropertyType {
    if (typeof this.options.reference === 'string') {
      return 'reference'
    }
    return overrideFromOptions('type', this.property, this.options) as PropertyType
  }

  /**
   * If given property has limited number of available values
   * it returns them.
   *
   * @returns {Array<{value: string, label: string}>}
   */
  availableValues(): null | Array<{ value: string | number; label?: string }> {
    if (this.options.availableValues) {
      return this.options.availableValues
    }
    const values = this.property.availableValues()
    if (values) {
      return values.map((value) => ({ value, label: value }))
    }
    return null
  }

  isArray(): boolean {
    if (typeof this.options.isArray !== 'undefined') {
      return !!this.options.isArray
    }
    return this.property.isArray()
  }

  isDraggable(): boolean {
    if (typeof this.options.isDraggable !== 'undefined') {
      return this.isArray() && !!this.options.isDraggable
    }
    return this.property.isDraggable()
  }

  /**
   * Indicates if given property should be visible
   *
   * @param {'list' | 'edit' | 'show' | 'filter'} where
   */
  isVisible(where: PropertyPlace): boolean {
    if (typeof this.options.isVisible === 'object' && this.options.isVisible !== null) {
      return !!this.options.isVisible[where]
    }
    if (typeof this.options.isVisible === 'boolean') {
      return this.options.isVisible
    }
    if (where === 'edit') {
      return this.property.isEditable()
    }
    return this.property.isVisible()
  }

  /**
   * Position of the field
   *
   * @return {number}
   */
  position(): number {
    if (this.options.position) {
      return this.options.position
    }
    if (this.isTitle()) { return -1 }
    if (this.isId()) { return 0 }
    return 100 + this.property.position()
  }

  /**
   * If property should be treated as an ID field
   *
   * @return {boolean}
   */
  isId(): boolean {
    return !!overrideFromOptions('isId', this.property, this.options)
  }

  /**
   * If property should be marked as a required with a star (*)
   *
   * @return {boolean}
   */
  isRequired(): boolean {
    return !!overrideFromOptions('isRequired', this.property, this.options)
  }

  /**
   * If property should be treated as an title field
   * Title field is used as a link to the resource page
   * in the list view and in the breadcrumbs
   *
   * @return {boolean}
   */
  isTitle(): boolean {
    return !!overrideFromOptions('isTitle', this.property, this.options)
  }

  /**
   * If property should be disabled in the UI
   *
   * @return  {boolean}
   */
  isDisabled(): boolean {
    return !!this.options.isDisabled
  }

  /**
   * Returns JSON representation of a property
   *
   * @param {PropertyPlace} [where]
   *
   * @return {PropertyJSON}
   */
  toJSON(where?: PropertyPlace): BasePropertyJSON {
    return {
      isTitle: this.isTitle(),
      isId: this.isId(),
      position: this.position(),
      custom: typeof this.options.custom === 'undefined' ? {} : this.options.custom,
      isSortable: this.isSortable(),
      isRequired: this.isRequired(),
      availableValues: this.availableValues(),
      name: this.name(),
      propertyPath: this.propertyPath,
      isDisabled: this.isDisabled(),
      label: this.label(),
      type: this.type(),
      hideLabel: !!this.options.hideLabel,
      reference: this.referenceName(),
      components: this.options.components,
      subProperties: this.subProperties()
        .filter((subProperty) => !where || subProperty.isVisible(where))
        .map((subProperty) => subProperty.toJSON(where)),
      isArray: this.isArray(),
      isDraggable: this.isDraggable(),
      resourceId: this._resource.id(),
      isVirtual: this.isVirtual,
      props: this.options.props || {},
      description: this.options.description
        ? this.options.description : undefined,
    }
  }

  /**
   * Decorates subProperties
   *
   * @return  {Array<PropertyDecorator>}  decorated subProperties
   */
  subProperties(): Array<PropertyDecorator> {
    const dbSubProperties = this.property.subProperties().map((subProperty) => {
      const path = `${this.propertyPath}.${subProperty.name()}`
      const decorated = new PropertyDecorator({
        property: subProperty,
        admin: this._admin,
        options: this.getOptionsForSubProperty(path),
        resource: this._resource,
        path,
      })
      return decorated
    })
    return [...dbSubProperties, ...this.virtualSubProperties]
  }

  addSubProperty(subProperty: PropertyDecorator): void {
    this.virtualSubProperties.push(subProperty)
  }

  /**
   * Returns PropertyOptions passed by the user for a subProperty. Furthermore
   * it changes property name to the nested property key.
   *
   * @param   {String}     propertyPath
   * @return  {PropertyOptions}
   * @private
   */
  private getOptionsForSubProperty(propertyPath: string): PropertyOptions {
    const propertyOptions = (this._resource.options || {}).properties || {}
    return {
      ...propertyOptions[propertyPath],
    }
  }
}

export default PropertyDecorator
