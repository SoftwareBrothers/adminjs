const moment = require('moment')
const BaseProperty = require('../adapters/base-property')
const ViewHelpers = require('./view-helpers')

const DEFAULT_MAX_ITEMS_IN_LIST = 5

/**
 * Base decorator class which decorates the Resource.
 *
 * Decorators are passed along with resources during the AdminBro setup. By default
 * each resource has BaseDecorator, but it can be overriden.
 *
 * @example
 *
 * const { BaseDecorator } = require('../../admin/index')
 *
 * class ArticleDecorator extends BaseDecorator {
 *   constructor(params) {
 *     super(params)
 *     this.resourceName = 'Article'
 *     this.listProperties = ['title', 'content', 'publishedAt']
 *     this.showProperties = ['title', 'publishedAt']
 *     this.parentName = 'Knowledge'
 *   }
 *
 *   getValue({ record, property, where}) {
 *     switch (property.name()) {
 *     case 'publishedAt':
 *       return `
 *         <p>Here goes a paragraph</p>
 *         <p>and another one</p>
 *         <a href="${this.helpers.showRecordUrl(record.resource, record)}">Link somewere</>
 *       `
 *     default:
 *       return super.getValue({ record, property, where })
 *     }
 *   }
 * }
 *
 */
class BaseDecorator {
  /**
   * @param  {Object}       options
   * @param  {BaseResource} options.resource  resource which is decorated
   * @param  {AdminBro}     options.admin  current instance of AdminBro
   */
  constructor({ resource, admin }) {
    this._resource = resource
    this._admin = admin

    this.helpers = new ViewHelpers({ admin })

    /**
     * Resource name, when not given decorator will use raw name of the resource
     * @type {String | Function | null}
     */
    this.resourceName = null

    /**
     * Name of the parent of given resource. It will be used in the sidebar as a 'above'
     * element
     *
     * @type {String | Function | null}
     */
    this.parentName = null

    /**
     * List of properties which should be visible in the list view
     * @type {String[] | Function | null}
     */
    this.listProperties = null

    /**
     * List of properties which should be visible in the show view
     * @type {String[] | Function | null}
     */
    this.showProperties = null
  }

  /**
   * Returns the name for the resource.
   * @return {String} resource name
   */
  getResourceName() {
    return this.invokeOrGet('resourceName') || this._resource.name()
  }

  /**
   * Returns resource parent along with the icon. By default it is a
   * database type with its icon
   * @return {Object}
   */
  getParent() {
    const parent = this.invokeOrGet('parent') || this._resource.databaseName()
    const name = parent.name || parent
    const icon = parent.icon ? parent.icon : `icon-${this._resource.databaseType() || 'database'}`
    return { name, icon }
  }

  /**
   * Returns list of all properties which will be visible on the list
   * @return {BaseProperty[]}
   */
  getListProperties() {
    const overridenProperties = this.invokeOrGet('listProperties')
    if (overridenProperties) {
      return overridenProperties.map(property => this.nameToProperty(property))
    }
    return this._resource.properties()
      .filter(property => property.isVisible()).slice(0, DEFAULT_MAX_ITEMS_IN_LIST)
  }

  /**
   * Returns list of all properties which will be visible on the show view
   * @return {BaseProperty[]}
   */
  getShowProperties() {
    const overridenProperties = this.invokeOrGet('showProperties')
    if (overridenProperties) {
      return overridenProperties.map(property => this.nameToProperty(property))
    }
    return this._resource.properties().filter(property => property.isEditable())
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
   * Change name to the Property object
   * Custom Properties are not sortable
   * @param  {String} propertyName [description]
   * @return {BaseProperty}              [description]
   */
  nameToProperty(propertyName) {
    return this._resource.property(propertyName) || new BaseProperty({ path: propertyName, isSortable: false })
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

  /**
   * Returns value for given field.
   *
   * @param  {Object} options
   * @param  {BaseRecord}   options.record
   * @param  {BaseProperty} options.property
   * @param  {String}       options.where    one of: list | show
   * @return {String}                        Html string which will be rendered
   */
  getValue({ record, property, where }) {
    if (property.type() === 'date') {
      return moment(record.param(property.name())).format('YYYY-MM-DD')
    }
    return record.param(property.name())
  }
}

module.exports = BaseDecorator
