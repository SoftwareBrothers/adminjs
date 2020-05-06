import * as _ from 'lodash'
import BaseProperty from '../adapters/base-property'
import PropertyDecorator from './property-decorator'
import ActionDecorator from './action-decorator'
import ViewHelpers from '../utils/view-helpers'
import ConfigurationError from '../utils/configuration-error'
import BaseResource from '../adapters/base-resource'
import AdminBro from '../../admin-bro'
import * as ACTIONS from '../actions/index'
import { ResourceOptions } from './resource-options.interface'
import Action, { ActionResponse } from '../actions/action.interface'
import { CurrentAdmin } from '../../current-admin.interface'
import ResourceJSON from './resource-json.interface'
import { PropertyPlace } from './property-json.interface'
import BaseRecord from '../adapters/base-record'

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
   * @throws  {ConfigurationError} when there is no property for given key
   */
  getPropertyByKey(propertyPath: string): PropertyDecorator {
    const property = this.properties[propertyPath]
    if (!property) {
      throw new ConfigurationError(
        `there is no property by the name of '${propertyPath}' in resource ${this.getResourceName()}`,
        'tutorial-04-customizing-resources.html',
      )
    }
    return property
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
    where: PropertyPlace;
    max?: number;
  }): Array<PropertyDecorator> {
    const whereProperties = `${where}Properties` // like listProperties, viewProperties etc
    if (this.options[whereProperties] && this.options[whereProperties].length) {
      return this.options[whereProperties].map(this.getPropertyByKey)
    }

    const properties = Object.keys(this.properties)
      .filter(key => this.properties[key].isVisible(where))
      .sort((key1, key2) => (
        this.properties[key1].position()

        > this.properties[key2].position() ? 1 : -1))
      .map(key => this.properties[key])

    if (max) {
      return properties.slice(0, max)
    }
    return properties
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
      resourceActions: this.resourceActions(currentAdmin).map(ra => ra.toJSON()),
      actions: Object.values(this.actions).map(action => action.toJSON()),
      listProperties: this.getProperties({
        where: 'list', max: DEFAULT_MAX_COLUMNS_IN_LIST,
      }).map(property => property.toJSON()),
      editProperties: this.getProperties({
        where: 'edit',
      }).map(property => property.toJSON()),
      showProperties: this.getProperties({
        where: 'show',
      }).map(property => property.toJSON()),
      filterProperties: this.getProperties({
        where: 'filter',
      }).map(property => property.toJSON()),
    }
  }
}

export default ResourceDecorator
