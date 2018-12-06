const BaseProperty = require('../adapters/base/property')

const DEFAULT_MAX_ITEMS_IN_LIST = 5

/**
 * Base decorator class which decorates the Resource.
 * It can be easily overriden in settings
 */
class BaseDecorator {
  /**
   * @param  {BaseResource} resource  resource which is decorated
   */
  constructor(resource) {
    this._resource = resource
  }

  /**
   * Returns the name for the resource.
   * @return {String} resource name
   */
  getResourceName() {
    return this.invokeOrGet('resourceName') || this._resource.name()
  }

  getParent() {
    const parent = this.invokeOrGet('parent')
    return {
      name: this.getDatabaseName(parent),
      icon: this.getIcon(parent)
    }
  }

  getDatabaseName(parent) {
    if (parent instanceof Object) {
      return parent.name
    }
    if (typeof(parent) === 'string' || parent instanceof String) {
      return parent
    }
    return this._resource.databaseName()
  }

  getIcon(parent) {
    const hasCustomIcon = parent instanceof Object && parent.icon
    const iconType = this._resource.databaseType() === 'mongoose' ? 'mongodb' : 'database'
    return hasCustomIcon ? parent.icon : `icon-${iconType}`
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

  getShowProperties() {
    const overridenProperties = this.invokeOrGet('showProperties')
    if (overridenProperties) {
      return overridenProperties.map(property => this.nameToProperty(property))
    }
    return this._resource.properties().filter(property => property.isEditable())
  }


  nameToProperty(propertyName) {
    return this._resource.property(propertyName) || new BaseProperty({ path: propertyName })
  }

  invokeOrGet(param) {
    return (this[param] instanceof Function) ? this[param]() : this[param]
  }

  /**
   * returns value for given field
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
