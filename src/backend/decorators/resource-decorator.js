const _ = require('lodash')
const BaseProperty = require('../adapters/base-property')
const PropertyDecorator = require('./property-decorator')
const ViewHelpers = require('../utils/view-helpers')
const ConfigurationError = require('../utils/configuration-error')

/**
 * Default maximum number of items which should be present in a list.
 *
 * @type {Number}
 * @private
 */
const DEFAULT_MAX_ITEMS_IN_LIST = 8

/**
 * @typedef {Object} ResourceOptions
 * @property {String} name      name of a resource
 * @property {Array<String>}  listProperties    list of all properties which should be visible
 *                                              on a list
 * @property {Array<String>}  showProperties    list of all properties which should be visible
 *                                              on an object view
 * @property {Array<String>}  editProperties    list of all properties which should be visible
 *                                              on edit screen
 * @property {Array<String>}  filterProperties  list of all properties which should be visible
 *                                              in the filter
 * @property {Object | String} parent   parent category in the sidebar
 * @property {String} parent.name       name of the parent category
 * @property {String} parent.icon       icon class of a parent category (i.e. 'icon-bomb')
 * @property {Object<String, PropertyOptions>} properties list of properties with their options
 * @property {Object<String, Action>} actions   list of actions
 */

/**
 * Base decorator class which decorates the Resource.
 *
 * @category Decorators
 */
class ResourceDecorator {
  /**
   * @param  {Object}       options
   * @param  {BaseResource} options.resource  resource which is decorated
   * @param  {AdminBro}     options.admin  current instance of AdminBro
   * @param  {ResourceOptions} [options]
   */
  constructor({ resource, admin, options = {} }) {
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
     * @type {Object<String, Action>}
     */
    this.actions = this.decorateActions()
  }

  /**
   * Used to create an {@link ResourceDecorator#action} property based on both
   * {@link AdminBro.ACTIONS default actions} and actions specified by the user
   * via {@link AdminBroOptions}
   *
   * @returns {Object<String, Action>}
   */
  decorateActions() {
    const { ACTIONS } = this._admin.constructor

    // in the end we merge actions defined by the user with the default actions.
    // since _.merge is a deep merge it also overrides defaults with the parameters
    // specified by the user.
    const actions = _.merge({}, ACTIONS, this.options.actions || {})

    // setting default values for actions
    Object.keys(actions).forEach((key) => {
      actions[key].name = actions[key].name || key
      actions[key].label = actions[key].label || key
      if (typeof actions[key].isVisible === 'undefined') {
        actions[key].isVisible = true
      }
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
      })
      return { ...memo, [property.name()]: decorator }
    }, {})

    // decorate all properties user gave in options but the don't exist in the resource
    Object.keys(this.options.properties).forEach((key) => {
      if (!properties[key]) {
        const property = new BaseProperty({ path: key, isSortable: false })
        properties[key] = new PropertyDecorator({
          property,
          admin: this._admin,
          options: this.options.properties[key],
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
  getParent() {
    const parent = this.options.parent || this._resource.databaseName()
    const name = parent.name || parent
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
    const properties = Object.keys(this.properties)
      .filter(key => this.properties[key].isVisible(where))
      .sort((key1, key2) => this.properties[key1].position() > this.properties[key2].position())
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
   * @return  {Array<Action>}     Actions assigned to resources
   */
  resourceActions() {
    return Object.keys(this.actions)
      .map(key => this.actions[key])
      .filter((action) => {
        let isVisible
        if (typeof action.isVisible === 'function') {
          isVisible = action.isVisible(this._resource)
        } else {
          ({ isVisible } = action)
        }
        return action.actionType.includes('resource') && isVisible
      })
  }

  /**
   * List of all actions which should be invoked for given record and not
   * for an entire resource
   *
   * @param {BaseResource} resource
   * @param {BaseRecord} record
   * @return  {Array<Action>}     Actions assigned to each record
   */
  recordActions(record) {
    return Object.keys(this.actions)
      .map(key => this.actions[key])
      .filter((action) => {
        let isVisible
        if (typeof action.isVisible === 'function') {
          isVisible = action.isVisible(this._resource, record)
        } else {
          ({ isVisible } = action)
        }
        return action.actionType.includes('record') && isVisible
      })
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
   * @typedef {Object} Action~JSON
   * @description JSON representation of an {@link Action}
   * @property {String} name
   * @property {String | Array<String>} actionType one of 'record' 'resource or
   *                                               an array containing both
   * @property {String} icon
   * @property {String} label
   * @property {String} guard
   * @property {String} component
   */

  /**
   * Serializes given {@link Action} to JSON format.
   *
   * @param   {Action}  action
   *
   * @return  {Action~JSON}
   */
  static serializeAction(action) {
    return {
      name: action.name,
      isVisible: action.isVisible,
      actionType: action.actionType,
      icon: action.icon,
      label: action.label,
      guard: action.guard,
      component: action.component,
    }
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
   * @return  {BaseResource~JSON}
   */
  toJSON() {
    return {
      id: this._resource.id(),
      name: this.getResourceName(),
      parent: this.getParent(),
      href: this.h.listUrl({ resourceId: this._resource.id() }),
      titleProperty: this.titleProperty().toJSON(),
      resourceActions: this.resourceActions().map(ra => ResourceDecorator.serializeAction(ra)),
      recordActions: this.recordActions().map(ra => ResourceDecorator.serializeAction(ra)),
      listProperties: this.getProperties({ where: 'list', max: DEFAULT_MAX_ITEMS_IN_LIST }).map(
        property => property.toJSON(),
      ),
      editProperties: this.getProperties({ where: 'edit' }).map(property => property.toJSON()),
      showProperties: this.getProperties({ where: 'show' }).map(property => property.toJSON()),
      filterProperties: this.getProperties({ where: 'filter' }).map(property => property.toJSON()),
    }
  }
}

ResourceDecorator.DEFAULT_MAX_ITEMS_IN_LIST = DEFAULT_MAX_ITEMS_IN_LIST

module.exports = ResourceDecorator
