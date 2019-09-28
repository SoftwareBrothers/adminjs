import * as _ from 'lodash'
import BaseProperty from '../adapters/base-property'
import PropertyDecorator from './property-decorator'
import ActionDecorator from './action-decorator'
import ViewHelpers from '../utils/view-helpers'
import ConfigurationError from '../utils/configuration-error'
import BaseResource from '../adapters/base-resource'
import { AdminBro, ACTIONS } from '../../admin-bro'
import { ResourceOptions } from './resource-options.interface'
import { PropertyOptions } from './property-options.interface'
import BaseRecord from '../adapters/base-record'
import CurrentAdmin from '../../current-admin.interface'

/**
 * Default maximum number of items which should be present in a list.
 *
 * @type {Number}
 * @private
 */
export const DEFAULT_MAX_ITEMS_IN_LIST = 8
/**
 * Base decorator class which decorates the Resource.
 *
 * @category Decorators
 */
export default class ResourceDecorator {
  private _resource: BaseResource
  private _admin: AdminBro
  private h: ViewHelpers
  private properties: {[key: string]: PropertyDecorator}
  private actions: {[key: string]: ActionDecorator}
  public options: ResourceOptions
  /**
   * @param  {Object}       options
   * @param  {BaseResource} options.resource  resource which is decorated
   * @param  {AdminBro}     options.admin  current instance of AdminBro
   * @param  {ResourceOptions} [options.options]
   */
  constructor({ resource, admin, options = {} }: {
    resource: BaseResource,
    admin: AdminBro,
    options: ResourceOptions,
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
   * Used to create an {@link ResourceDecorator#action} property based on both
   * {@link AdminBro.ACTIONS default actions} and actions specified by the user
   * via {@link AdminBroOptions}
   *
   * @returns {Object<String, ActionDecorator>}
   */
  decorateActions() {

    // in the end we merge actions defined by the user with the default actions.
    // since _.merge is a deep merge it also overrides defaults with the parameters
    // specified by the user.
    const actions = _.merge({}, ACTIONS, this.options.actions || {})

    // setting default values for actions
    Object.keys(actions).forEach((key) => {
      actions[key].name = actions[key].name || key
      actions[key].label = actions[key].label || key
      actions[key] = new ActionDecorator({
        action: actions[key],
        admin: this._admin,
        resource: this._resource,
      })
    })

    return actions
  }

  /**
   * Initializes PropertyDecorator for all properties within a resource. When
   * user passess new property in the options - it will be created as well.
   *
   * @returns {Object<String,PropertyDecorator>}
   * @private
   */
  decorateProperties() {
    const resourceProperties = this._resource.properties()
    // decorate all exising properties
    const properties = resourceProperties.reduce((memo, property) => {
      const decorator = new PropertyDecorator({
        property,
        admin: this._admin,
        options: this.options.properties[property.name()],
        resource: this,
      })
      return { ...memo, [property.name()]: decorator }
    }, {})

    // decorate all properties user gave in options but they don't exist in the resource
    Object.keys(this.options.properties).forEach((key) => {
      if (!properties[key] && !key.match(/\./)) {
        const property = new BaseProperty({ path: key, isSortable: false })
        properties[key] = new PropertyDecorator({
          property,
          admin: this._admin,
          options: this.options.properties[key],
          resource: this,
        })
      }
    })
    return properties
  }

  /**
   * Returns the name for the resource.
   * @return {String} resource name
   */
  getResourceName() {
    return this.options.name || this._resource.name()
  }

  /**
   * Returns resource parent along with the icon. By default it is a
   * database type with its icon
   * @return {Object<String,String>} returns { name, icon }
   */
  getParent(): {name: string, icon: string} {
    const parent = <{name: string, icon: string}> (this.options.parent || this._resource.databaseName())
    const name = <string> (parent.name || parent)
    const icon = parent.icon ? parent.icon : `icon-${this._resource.databaseType() || 'database'}`
    return { name, icon }
  }

  /**
   * Returns propertyDecordator by giving property path
   *
   * @param   {String}  propertyPath  property path
   *
   * @return  {PropertyDecorator}
   * @throws  {ConfigurationError} when there is no property for given key
   */
  getPropertyByKey(propertyPath) {
    const property = this.properties[propertyPath]
    if (!property) {
      throw new ConfigurationError(
        `there is no property by the name of ${propertyPath} in resource ${this.getResourceName()}`,
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
   * @param   {String}  [options.max]   maximum number of properites retunred where there are
   *                                    no overrides in the options
   *
   * @return {Array<PropertyDecorator>}
   */
  getProperties({ where, max = null }) {
    const whereProperties = `${where}Properties` // like listProperties, viewProperties etc
    if (this.options[whereProperties] && this.options[whereProperties].length) {
      return this.options[whereProperties].map(this.getPropertyByKey)
    }

    const keys = Object.keys(this.properties)

    const properties = Object.keys(this.properties)
      .filter(key => this.properties[key].isVisible(where))
      .sort((key1, key2) => this.properties[key1].position() > this.properties[key2].position() ? 1 : -1)
      .map(key => this.properties[key])

    if (max) {
      return properties.slice(0, max)
    }
    return properties
  }

  getListProperties() {
    return this.getProperties({ where: 'list', max: DEFAULT_MAX_ITEMS_IN_LIST })
  }

  /**
   * List of all actions which should be invoked for entire resource and not
   * for a particular record
   *
   * @param {CurrentAdmin} currentAdmin   currently logged in admin user
   * @return  {Array<Action>}     Actions assigned to resources
   */
  resourceActions(currentAdmin: CurrentAdmin) {
    return Object.values(this.actions)
      .filter(action => (
        action.isResourceType()
        && action.isVisible(currentAdmin)
        && action.isAccessible(currentAdmin)
      ))
  }

  /**
   * List of all actions which should be invoked for given record and not
   * for an entire resource
   *
   * @param {CurrentAdmin} currentAdmin   currently logged in admin user
   * @param {BaseRecord} record           record for which action should be invoked
   * @return  {Array<Action>}     Actions assigned to each record
   */
  recordActions(currentAdmin: CurrentAdmin, record: BaseRecord) {
    return Object.values(this.actions)
      .filter(action => (
        action.isRecordType()
        && action.isVisible(currentAdmin, record)
        && action.isAccessible(currentAdmin, record)
      ))
  }

  /**
   * Returns PropertyDecorator of a property which should be treaten as a title property.
   *
   * @return  {PropertyDecorator} PropertyDecorator of title property
   */
  titleProperty() {
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
  titleOf(record) {
    return record.param(this.titleProperty().name())
  }

  /**
   * @typedef {Object} BaseResource~JSON
   * @property {String} id        uniq ID of a resource
   * @property {String} name      resource name used in the UI
   * @property {String} parent.name       name of the parent category
   * @property {String} parent.icon       icon class of a parent category (i.e. 'icon-bomb')
   * @property {String} titleProperty     name of a property which should be treated as a
   *                                      _title_ property.
   * @property {Array<Action~JSON>} recordActions   list of all record actions available for
   *                                                given resource
   * @property {Array<Action~JSON>} resourceActions list of all resource actions available
   *                                                for given resource
   * @property {Array<BaseProperty~JSON>} listProperties
   * @property {Array<BaseProperty~JSON>} editProperties
   * @property {Array<BaseProperty~JSON>} showProperties
   * @property {Array<BaseProperty~JSON>} filterProperties
   */

  /**
   * Returns JSON representation of a resource
   *
   * @param {CurrentAdmin} currentAdmin
   * @return  {BaseResource~JSON}
   */
  toJSON(currentAdmin?: CurrentAdmin) {
    return {
      id: this._resource.id(),
      name: this.getResourceName(),
      parent: this.getParent(),
      href: this.h.resourceActionUrl({ resourceId: this._resource.id(), actionName: 'list' }),
      titleProperty: this.titleProperty().toJSON(),
      resourceActions: this.resourceActions(currentAdmin).map(ra => ra.toJSON()),
      // recordActions: this.recordActions(currentAdmin).map(ra => ra.toJSON()),
      listProperties: this.getProperties({ where: 'list', max: DEFAULT_MAX_ITEMS_IN_LIST }).map(
        property => property.toJSON(),
      ),
      editProperties: this.getProperties({ where: 'edit' }).map(property => property.toJSON()),
      showProperties: this.getProperties({ where: 'show' }).map(property => property.toJSON()),
      filterProperties: this.getProperties({ where: 'filter' }).map(property => property.toJSON()),
    }
  }
}