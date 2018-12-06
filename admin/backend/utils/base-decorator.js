const BaseProperty = require('../adapters/base/property')

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
 *   getValue({ record, property, where, helpers }) {
 *     switch (property.name()) {
 *     case 'publishedAt':
 *       return `
 *         <p>Here goes a paragraph</p>
 *         <p>and another one</p>
 *         <a href="${helpers.showRecordUrl(record.resource, record)}">Link somewere</>
 *       `
 *     default:
 *       return super.getValue({ record, property, where, helpers })
 *     }
 *   }
 * }
 *
 */
class BaseDecorator {
  /**
   * @param  {BaseResource} resource  resource which is decorated
   */
  constructor(resource) {
    this._resource = resource

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
   * Returns resource parent. Database name by default
   * @return {String}
   */
  getParent() {
    return this.invokeOrGet('parentName') || this._resource.databaseName()
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
    return this._resource.properties().filter((property) => {
      return property.isVisible()
    }).slice(0, DEFAULT_MAX_ITEMS_IN_LIST)
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
   * Change name to the Property object
   * @param  {String} propertyName [description]
   * @return {BaseProperty}              [description]
   */
  nameToProperty(propertyName) {
    return this._resource.property(propertyName) || new BaseProperty({ path: propertyName })
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
   * @param  {ViewHelpers}  options.helpers  view helpers
   * @return {String}                        Html string which will be rendered
   */
  getValue({ record, property, where, helpers }) {
    return record.param(property.name())
  }
}

module.exports = BaseDecorator
