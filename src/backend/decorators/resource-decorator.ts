import * as _ from 'lodash'
import BaseProperty from '../adapters/base-property'
import PropertyDecorator from './property-decorator'
import ActionDecorator from './action-decorator'
import ViewHelpers from '../utils/view-helpers'
import BaseResource from '../adapters/base-resource'
import AdminBro from '../../admin-bro'
import * as ACTIONS from '../actions/index'
import { ResourceOptions } from './resource-options.interface'
import Action, { ActionResponse } from '../actions/action.interface'
import { CurrentAdmin } from '../../current-admin.interface'
import ResourceJSON from './resource-json.interface'
import PropertyJSON, { PropertyPlace } from './property-json.interface'
import BaseRecord from '../adapters/base-record'

/**
 * Default maximum number of items which should be present in a list.
 *
 * @type {Number}
 * @private
 */
export const DEFAULT_MAX_COLUMNS_IN_LIST = 8

type PathParts = Array<string>

/**
 * Changes path with flatten notation, with dots (.) inside, to array of all possible
 * keys which can have a property.
 *
 * - changes: `nested.nested2.normalInner`
 * - to `["nested", "nested.nested2", "nested.nested2.normalInner"]`
 *
 * Also it takes care of the arrays, which are separated by numbers (indexes).
 * - changes: `nested.0.normalInner.1`
 * - to: `nested.normalInner`
 *
 * Everything because when we look for a property of a given path it can be inside a
 * mixed property. So first, we have to find top level mixed property, and then,
 * step by step, find inside each of them.
 *
 * @private
 *
 * @param   {string}  propertyPath
 *
 * @return  {PathParts}
 */
const pathToParts = (propertyPath: string): PathParts => (
  // eslint-disable-next-line no-restricted-globals
  propertyPath.split('.').filter(part => isNaN(+part)).reduce((memo, part) => {
    if (memo.length) {
      return [
        ...memo,
        [memo[memo.length - 1], part].join('.'),
      ]
    }
    return [part]
  }, [] as Array<string>)
)

/**
 * @private
 *
 * @param   {PathParts}  pathParts    parts returned by `pathToParts` method
 * @param   {PropertyDecorator}       rootProperty where function should recursively search for
 *                                    a subProperty matching one of the pathParts
 *
 * @return  {PropertyDecorator | null}  found subProperty
 */
const findSubProperty = (
  pathParts: PathParts,
  rootProperty: PropertyDecorator,
): PropertyDecorator | null => {
  const subProperties = rootProperty.subProperties()
  const foundPath = pathParts.find(path => (
    subProperties.find(supProperty => supProperty.path === path)))
  if (foundPath) {
    const subProperty = subProperties.find(supProperty => supProperty.path === foundPath)
    if (subProperty && foundPath !== pathParts[pathParts.length - 1]) {
      // if foundPath is not the last (full) path - checkout recursively all subProperties
      return findSubProperty(pathParts, subProperty)
    }
    return subProperty || null
  }
  return null
}

/**
 * Bu default all subProperties are nested as an array in root Property. This is easy for
 * adapter to maintain. But in AdminBro core we need a fast way to access them by path.
 *
 * This function changes an array to object recursively (for nested subProperties) so they
 * could be accessed via properties['path.to.sub.property']
 *
 * @param   {PropertyDecorator}  rootProperty
 *
 * @return  {Record<PropertyDecorator>}
 * @private
 */
const flatSubProperties = (rootProperty: PropertyDecorator): Record<string, PropertyJSON> => (
  rootProperty.subProperties().reduce((subMemo, subProperty) => ({
    ...subMemo,
    [subProperty.path]: subProperty.toJSON(),
    ...flatSubProperties(subProperty),
  }), {})
)

/**
 * Base decorator class which decorates the Resource.
 *
 * @category Decorators
 */
class ResourceDecorator {
  public properties: {[key: string]: PropertyDecorator}

  public options: ResourceOptions

  public actions: {[key: string]: ActionDecorator}

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
    this.properties = this.decorateProperties()

    /**
     * Actions for a resource
     * @type {Object<String, ActionDecorator>}
     */
    this.actions = this.decorateActions()
  }

  /**
   * Used to create an {@link ActionDecorator} based on both
   * {@link AdminBro.ACTIONS default actions} and actions specified by the user
   * via {@link AdminBroOptions}
   *
   * @returns {Record<string, ActionDecorator>}
   */
  decorateActions(): {[key: string]: ActionDecorator} {
    // in the end we merge actions defined by the user with the default actions.
    // since _.merge is a deep merge it also overrides defaults with the parameters
    // specified by the user.
    const actions = _.merge({}, ACTIONS, this.options.actions || {})
    const returnActions = {}
    // setting default values for actions
    Object.keys(actions).forEach((key: string) => {
      const action: Action<ActionResponse> = {
        name: actions[key].name || key,
        label: actions[key].label || key,
        actionType: actions[key].actionType || ['resource'],
        handler: actions[key].handler || (async (): Promise<void> => {
          // eslint-disable-next-line no-console
          console.log('You have to define handler function')
        }),
        ...actions[key],
      }

      returnActions[key] = new ActionDecorator({
        action,
        admin: this._admin,
        resource: this._resource,
      })
    })

    return returnActions
  }

  /**
   * Initializes PropertyDecorator for all properties within a resource. When
   * user passes new property in the options - it will be created as well.
   *
   * @returns {Object<string,PropertyDecorator>}
   * @private
   */
  decorateProperties(): {[key: string]: PropertyDecorator} {
    const resourceProperties = this._resource.properties()
    // decorate all existing properties
    const properties = resourceProperties.reduce((memo, property) => {
      const decorator = new PropertyDecorator({
        property,
        admin: this._admin,
        options: this.options.properties && this.options.properties[property.name()],
        resource: this,
      })
      return { ...memo, [property.name()]: decorator }
    }, {})

    if (this.options.properties) {
    // decorate all properties user gave in options but they don't exist in the resource
      Object.keys(this.options.properties).forEach((key) => {
        if (!properties[key] && !key.match(/\./)) {
          const property = new BaseProperty({ path: key, isSortable: false })
          properties[key] = new PropertyDecorator({
            property,
            admin: this._admin,
            options: this.options.properties && this.options.properties[key],
            resource: this,
          })
        }
      })
    }
    return properties
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
  getParent(): ResourceJSON['parent'] {
    // when user gives parent: null
    if (this.options.parent === null) {
      return null
    }
    const parent = (
      this.options.parent || this._resource.databaseName()
    ) as {name: string; icon: string}
    const name = (parent.name || parent) as string
    const icon = parent.icon ? parent.icon : `icon-${this._resource.databaseType() || 'database'}`
    return { name, icon }
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
      parent: this.getParent(),
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
