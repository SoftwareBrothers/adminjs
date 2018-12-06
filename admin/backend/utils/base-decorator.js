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

  getShowProperties() {
    const overridenProperties = this.invokeOrGet('showProperties')
    if (overridenProperties) {
      return overridenProperties.map(property => this.nameToProperty(property))
    }
    return this._resource.properties().filter(property => property.isEditable())
  }

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

  checkIfActionIsAvailable(action) {
    const recordAvailableActions = this.invokeOrGet('recordActions')
    if (recordAvailableActions) {
      return recordAvailableActions.includes(action)
    } 
    // if record doesn't have available actions, it automatically uses default ones
    return DEFAULT_RECORD_ACTIONS.includes(action)
  }

  getRecordActions(helpers, record, actions) {
    const defaultActions = this.getDefaultActions(helpers, record)
    const givenActions = actions || null
    const recordActions = Object.keys(defaultActions)
      .filter(key => {
        if(givenActions && !givenActions.includes(key)) {
          return;
        }
        return this.checkIfActionIsAvailable(key)
      })
      .reduce(((obj, key) => { 
        return { ...obj, [key]: defaultActions[key] }}), {})
    return recordActions
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
