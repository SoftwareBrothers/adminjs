const BaseProperty = require('../adapters/base/property')

const DEFAULT_MAX_ITEMS_IN_LIST = 5

/**
 * Base decorator class which decorates the Model.
 * It can be easily overriden in settings
 */
class BaseDecorator {
  /**
   * @param  {AbstractModel} model  model which is decorated
   */
  constructor(model) {
    this._model = model
  }

  /**
   * Returns the name for the model.
   * @return {String} model name
   */
  getModelName() {
    return this.invokeOrGet('modelName') || this._model.name()
  }

  /**
   * Returns list of all properties which will be visible on the list
   * @return {BaseProperty[]}
   */
  getListProperties() {
    const overridenProperties = this.invokeOrGet('listProperties')
    if (overridenProperties) {
      return overridenProperties.map(p => this.nameToProperty(p))
    }
    return this._model.properties().filter(p => p.isVisible()).slice(0, DEFAULT_MAX_ITEMS_IN_LIST)
  }

  getShowProperties() {
    const overridenProperties = this.invokeOrGet('showProperties')
    if (overridenProperties) {
      return overridenProperties.map(p => this.nameToProperty(p))
    }
    return this._model.properties().filter(p => p.isEditable())
  }


  nameToProperty(propertyName) {
    const property = this._model.property(propertyName)
    if (!property) {
      return new BaseProperty({ path: propertyName })
    }
    return property
  }

  invokeOrGet(param) {
    if (this[param] instanceof Function) {
      return this[param]()
    }
    return this[param]
  }

  /**
   * returns value for given field
   * @param  {Object} options
   * @param  {BaseInstance} options.instance
   * @param  {BaseProperty} options.property
   * @param  {String}       options.where    one of: list | show
   * @param  {ViewHelpers}  options.helpers  view helpers
   * @return {String}                        Html string which will be rendered
   */
  getValue({ instance, property, where, helpers }) {
    return instance.param(property.name())
  }
}

module.exports = BaseDecorator
