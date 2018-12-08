const BaseProperty = require('../adapters/base/property')
const DEFAULT_MAX_ITEMS_IN_LIST = 5
const DEFAULT_RECORD_ACTIONS = ['show', 'edit', 'remove']

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

    /**
   * Returns the name and icon  of parent database
   * @return {String} resource name
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

 /**
  * Returns object(map) with default actions as keys and their values
  */
  getDefaultActions(helpers, record) {
    const resource = this._resource
    return {
      show: {
        path: helpers.showRecordUrl(resource, record),
        icon: 'info',
        label: 'Info' 
      },
      edit: {
        path: helpers.editRecordUrl(resource, record),
        icon: 'pen',
        label: 'Edit' 
      },
      remove: {
        path: helpers.deleteRecordUrl(resource, record),
        icon: 'trash',
        label: 'Remove' 
      }
    }
  }

  /**
  * Returns object(map) with record actions declared in his decorator
  */
  getAllAvailableActions(helpers, defaultActions, recordActions, record) {
    return recordActions.reduce((obj, key) => {
      if(typeof key === 'object') {
        return {...obj, ...{
            [key.id]: {...key, path: helpers.customRecordActionUrl(this._resource, record, key.id)}
          }
        }
      }
      return {...obj, ...(Object.keys(defaultActions).includes(key) && {[key]: defaultActions[key]})}
    }, {})
  }

  /**
  * Returns object(map) with record actions declared in his decorator.
  * If record doesn't have declared actions, it automatically returns default ones
  */
  getRecordActions(helpers, record) {
    const defaultActions = this.getDefaultActions(helpers, record)
    const recordActions = this.invokeOrGet('recordActions')
    if(recordActions) {
      return this.getAllAvailableActions(helpers, defaultActions, recordActions, record)
    }
    return defaultActions
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
