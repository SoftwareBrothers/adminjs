/* eslint-disable class-methods-use-this */
const BaseProperty = require('../adapters/base-property')
const ViewHelpers = require('../utils/view-helpers')
const PropertyDecorator = require('./property-decorator')

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
 * @property {properties<String, PropertyOptions>} properties list of properties with their options
 * @property {Object} actions
 * @property {Object} actions.action
 * @property {String} actions.action.icon
 * @property {String} actions.action.label
 * @property {Array | Boolean} actions.action.enable
 * @property {Function} actions.action.handler
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
    this._resource = resource
    this._admin = admin
    this.helpers = new ViewHelpers({ admin })

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
   * Returns list of all properties which will be visible on the list
   * @return {Array<PropertyDecorator>}
   */
  getListProperties() {
    if (this.options.listProperties && this.options.listProperties.length) {
      return this.options.listProperties.map(key => this.properties[key])
    }
    return Object.keys(this.properties)
      .filter(key => this.properties[key].isVisible('list'))
      .sort((key1, key2) => this.properties[key1].position() > this.properties[key2].position())
      .map(key => this.properties[key])
      .slice(0, DEFAULT_MAX_ITEMS_IN_LIST)
  }

  /**
   * Returns list of all properties which will be visible on the show view
   * @return {Array<PropertyDecorator>}
   */
  getShowProperties() {
    if (this.options.showProperties && this.options.showProperties.length) {
      return this.options.showProperties.map(key => this.properties[key])
    }
    return Object.keys(this.properties)
      .filter(key => this.properties[key].isVisible('show'))
      .map(key => this.properties[key])
  }

  /**
   * Returns list of all properties which will be visible on the edit page
   * @return {Array<PropertyDecorator>}
   */
  getEditProperties() {
    if (this.options.editProperties && this.options.editProperties.length) {
      return this.options.editProperties.map(key => this.properties[key])
    }
    return Object.keys(this.properties)
      .filter(key => this.properties[key].isVisible('edit'))
      .map(key => this.properties[key])
  }

  /**
   * Returns list of all properties which will be filterable
   * @return {Array<PropertyDecorator>}
   */
  getFilterProperties() {
    if (this.options.filterProperties && this.options.filterProperties.length) {
      return this.options.filterProperties.map(key => this.properties[key])
    }
    return Object.keys(this.properties)
      .filter(key => this.properties[key].isVisible('filter'))
      .map(key => this.properties[key])
  }

  /**
   * Returns list of all custom scripts which are should be included in the
   * head of the page. It gathers them from all properties which has defined custom
   * head - see: {@link PropertyType}
   *
   * @see PropertyType
   */
  customHeadScripts() {
    return Object.keys(this.properties)
      .map(key => this.properties[key])
      .filter(property => property.headScripts())
      .reduce((memo, property) => ({
        scripts: [...memo.scripts, ...property.headScripts().scripts],
        styles: [...memo.styles, ...property.headScripts().styles],
      }), { scripts: [], styles: [] })
  }

  property(propertyName) {
    return this.properties[propertyName]
  }

  /**
   * Returns object(map) with default actions as keys and their values
   */
  getDefaultActions(record) {
    const resource = this._resource
    return {
      show: {
        path: this.helpers.showRecordUrl(resource, record),
        icon: 'icomoon-info',
        label: 'Info',
      },
      edit: {
        path: this.helpers.editRecordUrl(resource, record),
        icon: 'icomoon-edit',
        label: 'Edit',
      },
      remove: {
        path: this.helpers.deleteRecordUrl(resource, record),
        icon: 'icomoon-remove-2',
        label: 'Remove',
      },
    }
  }

  /**
   * Returns object(map) with record actions declared in his decorator
   */
  getAllAvailableActions(defaultActions, recordActions, record) {
    return recordActions.reduce((obj, key) => {
      if (typeof key === 'object') {
        return {
          ...obj,
          ...{
            [key.id]: {
              ...key,
              path: this.helpers.customRecordActionUrl(this._resource, record, key.id),
            },
          },
        }
      }
      return {
        ...obj,
        ...(Object.keys(defaultActions).includes(key) && { [key]: defaultActions[key] }),
      }
    }, {})
  }

  /**
  * Returns object(map) with record actions declared in his decorator.
  * If record doesn't have declared actions, it automatically returns default ones
  */
  getRecordActions(record) {
    const defaultActions = this.getDefaultActions(record)
    const recordActions = this.invokeOrGet('recordActions')
    if (recordActions) {
      return this.getAllAvailableActions(defaultActions, recordActions, record)
    }
    return defaultActions
  }

  /**
   * For given parameter it tries to find class member, and when it is a function - it invokes
   * it, otherwise return parameter value
   * @param  {String} param
   * @return {any}
   */
  invokeOrGet(param) {
    return (this[param] instanceof Function) ? this[param]() : this[param]
  }
}

ResourceDecorator.DEFAULT_MAX_ITEMS_IN_LIST = DEFAULT_MAX_ITEMS_IN_LIST
module.exports = ResourceDecorator
