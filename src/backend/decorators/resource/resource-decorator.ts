import { DecoratedActions } from './utils/decorate-actions'

import { BaseResource, BaseRecord } from '../../adapters'
import { PropertyDecorator, ActionDecorator } from '..'
import ViewHelpers from '../../utils/view-helpers/view-helpers'
import AdminBro from '../../../admin-bro'

import { ResourceOptions } from './resource-options.interface'
import { CurrentAdmin } from '../../../current-admin.interface'
import { ResourceJSON, PropertyJSON, PropertyPlace } from '../../../frontend/interfaces'
import {
  decorateActions,
  decorateProperties,
  getNavigation,
  pathToParts,
  flatSubProperties,
  findSubProperty,
  DecoratedProperties,
} from './utils'


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
  public properties: DecoratedProperties

  public options: ResourceOptions

  public actions: DecoratedActions

  private _resource: BaseResource

  private _admin: AdminBro

  private h: ViewHelpers

  /**
   * @param  {object}       options
   * @param  {BaseResource} options.resource  resource which is decorated
   * @param  {AdminBro}     options.admin  current instance of AdminBro
   * @param  {ResourceOptions} [options.options]
   */
  constructor({ resource, admin, options = {} }: {
    resource: BaseResource;
    admin: AdminBro;
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
     * List of all decorated properties
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
    return this._admin.translateLabel(this.id(), this.id())
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
    const parts = pathToParts(propertyPath)
    const fullPath = parts[parts.length - 1]
    const property = this.properties[fullPath]

    if (!property) {
      // User asks for nested property (embed inside the mixed property)
      if (parts.length > 1) {
        const mixedPropertyPath = parts.find(part => (
          this.properties[part]
          && this.properties[part].type() === 'mixed'
        ))
        if (mixedPropertyPath) {
          const mixedProperty = this.properties[mixedPropertyPath]
          const subProperty = findSubProperty(parts, mixedProperty)

          if (subProperty) {
            return subProperty
          }
        }
      }
    }
    return property || null
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
              `[AdminBro]: There is no property of the name: "${propertyName}".`,
              `Check out the "${where}Properties" in the`,
              `resource: "${this._resource.id()}"`].join(' '))
          }
          return property
        }).filter(property => property)
    }

    const properties = Object.keys(this.properties)
      .filter(key => !where || this.properties[key].isVisible(where))
      .sort((key1, key2) => (
        this.properties[key1].position() > this.properties[key2].position()
          ? 1
          : -1
      ))
      .map(key => this.properties[key])

    if (max) {
      return properties.slice(0, max)
    }
    return properties
  }

  getFlattenProperties(): Record<string, PropertyJSON> {
    return Object.keys(this.properties).reduce((memo, propertyName) => {
      const property = this.properties[propertyName]

      const subProperties = flatSubProperties(property)
      return {
        ...memo,
        [propertyName]: property.toJSON(),
        ...subProperties,
      }
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
      .filter(action => (
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
      .filter(action => (
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
      .filter(action => (
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
    const properties = Object.values(this.properties)
    const titleProperty = properties.find(p => p.isTitle())
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
    return record.param(this.titleProperty().name())
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
    if (this.resourceActions(currentAdmin).find(action => action.name === 'list')) {
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
    return {
      id: this.id(),
      name: this.getResourceName(),
      navigation: this.getNavigation(),
      href: this.getHref(currentAdmin),
      titleProperty: this.titleProperty().toJSON(),
      resourceActions: this.resourceActions(currentAdmin).map(ra => ra.toJSON(currentAdmin)),
      actions: Object.values(this.actions).map(action => action.toJSON(currentAdmin)),
      properties: this.getFlattenProperties(),
      listProperties: this.getProperties({
        where: 'list', max: DEFAULT_MAX_COLUMNS_IN_LIST,
      }).map(property => property.toJSON('list')),
      editProperties: this.getProperties({
        where: 'edit',
      }).map(property => property.toJSON('edit')),
      showProperties: this.getProperties({
        where: 'show',
      }).map(property => property.toJSON('show')),
      filterProperties: this.getProperties({
        where: 'filter',
      }).map(property => property.toJSON('filter')),
    }
  }
}

export default ResourceDecorator
