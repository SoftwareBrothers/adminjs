import { DecoratedActions } from './utils/decorate-actions.js'
import { BaseResource, BaseRecord } from '../../adapters/index.js'
import { PropertyDecorator, ActionDecorator } from '../index.js'
import ViewHelpers from '../../utils/view-helpers/view-helpers.js'
import AdminJS from '../../../adminjs.js'
import { ResourceOptions } from './resource-options.interface.js'
import { CurrentAdmin } from '../../../current-admin.interface.js'
import { ResourceJSON, PropertyPlace } from '../../../frontend/interfaces/index.js'
import {
  decorateActions,
  decorateProperties,
  getNavigation,
  flatSubProperties,
  DecoratedProperties,
  getPropertyByKey,
} from './utils/index.js'

/**
 * Default maximum number of items which should be present in a list.
 *
 * @type {Number}
 * @private
 */
export const DEFAULT_MAX_COLUMNS_IN_LIST = 8

/**
 * Base decorator class which decorates the Resource.
 *
 * @category Decorators
 */
class ResourceDecorator {
  /**
   * Map of all root level properties. By root properties we mean property which is not nested
   * under other mixed property.
   *
   * Examples from PropertyOptions:
   * {
   *   rootProperty: { type: mixed }, // root property
   *
   *    // nested property - this should go be the subProperty of rootProperty
   *   'rootProperty.nested': { type: 'string' }
   *
   *   // also root property because there is no another property of type mixed
   *   'another.property': { type: 'string' },
   * }
   *
   * for a the reference {@see decorateProperties}
   */
  public properties: DecoratedProperties

  public options: ResourceOptions

  public actions: DecoratedActions

  private _resource: BaseResource

  private _admin: AdminJS

  private h: ViewHelpers

  /**
   * @param  {object}       options
   * @param  {BaseResource} options.resource  resource which is decorated
   * @param  {AdminJS}     options.admin  current instance of AdminJS
   * @param  {ResourceOptions} [options.options]
   */
  constructor({ resource, admin, options = {} }: {
    resource: BaseResource;
    admin: AdminJS;
    options: ResourceOptions;
  }) {
    this.getPropertyByKey = this.getPropertyByKey.bind(this)
    this._resource = resource
    this._admin = admin
    this.h = new ViewHelpers({ options: admin.options })

    /**
     * Options passed along with a given resource
     * @type {ResourceOptions}
    */
    this.options = options

    this.options.properties = this.options.properties || {}

    /**
     * List of all decorated root properties
     * @type {Array<PropertyDecorator>}
     */
    this.properties = decorateProperties(resource, admin, this)

    /**
     * Actions for a resource
     * @type {Object<String, ActionDecorator>}
     */
    this.actions = decorateActions(resource, admin, this)
  }

  /**
   * Returns the name for the resource.
   * @return {string} resource name
   */
  getResourceName(): string {
    return this.id()
  }

  /**
   * Returns the id for the resource.
   * @return {string} resource id
   */
  id(): string {
    return this.options.id || this._resource.id()
  }

  /**
   * Returns resource parent along with the icon. By default it is a
   * database type with its icon
   * @return {Parent}   ResourceJSON['parent']}
   */
  getNavigation(): ResourceJSON['navigation'] {
    return getNavigation(this.options, this._resource)
  }

  /**
   * Returns propertyDecorator by giving property path
   *
   * @param   {String}  propertyPath  property path
   *
   * @return  {PropertyDecorator}
   */
  getPropertyByKey(propertyPath: string): PropertyDecorator | null {
    return getPropertyByKey(propertyPath, this.properties)
  }

  /**
   * Returns list of all properties which will be visible in given place (where)
   *
   * @param   {Object}  options
   * @param   {String}  options.where   one of: 'list', 'show', 'edit', 'filter'
   * @param   {String}  [options.max]   maximum number of properties returned where there are
   *                                    no overrides in the options
   *
   * @return {Array<PropertyDecorator>}
   */
  getProperties({ where, max = 0 }: {
    where?: PropertyPlace;
    max?: number;
  }): Array<PropertyDecorator> {
    const whereProperties = `${where}Properties` // like listProperties, viewProperties etc
    if (where && this.options[whereProperties] && this.options[whereProperties].length) {
      return this.options[whereProperties]
        .map((propertyName) => {
          const property = this.getPropertyByKey(propertyName)
          if (!property) {
            // eslint-disable-next-line no-console
            console.error([
              `[AdminJS]: There is no property of the name: "${propertyName}".`,
              `Check out the "${where}Properties" in the`,
              `resource: "${this._resource.id()}"`].join(' '))
          }
          return property
        }).filter((property) => property)
    }

    const properties = Object.keys(this.properties)
      .filter((key) => !where || this.properties[key].isVisible(where))
      .sort((key1, key2) => (
        this.properties[key1].position() > this.properties[key2].position()
          ? 1
          : -1
      ))
      .map((key) => this.properties[key])

    if (max) {
      return properties.slice(0, max)
    }
    return properties
  }

  /**
   * Returns all the properties with corresponding subProperties in one object.
   */
  getFlattenProperties(): Record<string, PropertyDecorator> {
    return Object.keys(this.properties).reduce((memo, propertyName) => {
      const property = this.properties[propertyName]

      const subProperties = flatSubProperties(property)
      return Object.assign(memo, { [propertyName]: property }, subProperties)
    }, {})
  }

  getListProperties(): Array<PropertyDecorator> {
    return this.getProperties({ where: 'list', max: DEFAULT_MAX_COLUMNS_IN_LIST })
  }

  /**
   * List of all actions which should be invoked for entire resource and not
   * for a particular record
   *
   * @param {CurrentAdmin} currentAdmin   currently logged in admin user
   * @return  {Array<ActionDecorator>}     Actions assigned to resources
   */
  resourceActions(currentAdmin?: CurrentAdmin): Array<ActionDecorator> {
    return Object.values(this.actions)
      .filter((action) => (
        action.isResourceType()
        && action.isVisible(currentAdmin)
        && action.isAccessible(currentAdmin)
      ))
  }

  /**
   * List of all actions which should be invoked for entire resource and not
   * for a particular record
   *
   * @param {CurrentAdmin} currentAdmin   currently logged in admin user
   * @return  {Array<ActionDecorator>}     Actions assigned to resources
   */
  bulkActions(record: BaseRecord, currentAdmin?: CurrentAdmin): Array<ActionDecorator> {
    return Object.values(this.actions)
      .filter((action) => (
        action.isBulkType()
        && action.isVisible(currentAdmin, record)
        && action.isAccessible(currentAdmin, record)
      ))
  }

  /**
   * List of all actions which should be invoked for given record and not
   * for an entire resource
   *
   * @param {CurrentAdmin} [currentAdmin]   currently logged in admin user
   * @return  {Array<ActionDecorator>}     Actions assigned to each record
   */
  recordActions(record: BaseRecord, currentAdmin?: CurrentAdmin): Array<ActionDecorator> {
    return Object.values(this.actions)
      .filter((action) => (
        action.isRecordType()
        && action.isVisible(currentAdmin, record)
        && action.isAccessible(currentAdmin, record)
      ))
  }

  /**
   * Returns PropertyDecorator of a property which should be treated as a title property.
   *
   * @return  {PropertyDecorator} PropertyDecorator of title property
   */
  titleProperty(): PropertyDecorator {
    let titleProperty

    const properties = Object.values(this.properties)
    if (this.options.titleProperty) {
      titleProperty = this.getPropertyByKey(this.options.titleProperty)
    } else {
      titleProperty = properties.find((p) => p.isTitle())
    }

    return titleProperty || properties[0]
  }

  /**
   * Returns title for given record.
   *
   * For example: If given record has `name` property and this property has `isTitle` flag set in
   * options or by the Adapter - value for this property will be shown
   *
   * @param   {BaseRecord}  record
   *
   * @return  {String}      title of given record
   */
  titleOf(record: BaseRecord): string {
    return record.get(this.titleProperty().name()) as string
  }

  getHref(currentAdmin?: CurrentAdmin): string | null {
    const { href } = this.options
    if (href) {
      if (typeof href === 'function') {
        return href({
          resource: this._resource,
          currentAdmin,
          h: this.h,
        })
      }
      return href
    }
    if (this.resourceActions(currentAdmin).find((action) => action.name === 'list')) {
      return this.h.resourceUrl({ resourceId: this.id() })
    }
    return null
  }

  /**
   * Returns JSON representation of a resource
   *
   * @param {CurrentAdmin} currentAdmin
   * @return  {ResourceJSON}
   */
  toJSON(currentAdmin?: CurrentAdmin): ResourceJSON {
    const flattenProperties = this.getFlattenProperties()
    const flattenPropertiesJSON = Object.keys(flattenProperties).reduce((memo, key) => ({
      ...memo,
      [key]: flattenProperties[key].toJSON(),
    }), {})

    return {
      id: this.id(),
      name: this.getResourceName(),
      navigation: this.getNavigation(),
      href: this.getHref(currentAdmin),
      titleProperty: this.titleProperty().toJSON(),
      resourceActions: this.resourceActions(currentAdmin).map((ra) => ra.toJSON(currentAdmin)),
      actions: Object.values(this.actions).map((action) => action.toJSON(currentAdmin)),
      properties: flattenPropertiesJSON,
      listProperties: this.getProperties({
        where: 'list', max: DEFAULT_MAX_COLUMNS_IN_LIST,
      }).map((property) => property.toJSON('list')),
      editProperties: this.getProperties({
        where: 'edit',
      }).map((property) => property.toJSON('edit')),
      showProperties: this.getProperties({
        where: 'show',
      }).map((property) => property.toJSON('show')),
      filterProperties: this.getProperties({
        where: 'filter',
      }).map((property) => property.toJSON('filter')),
    }
  }
}

export default ResourceDecorator
