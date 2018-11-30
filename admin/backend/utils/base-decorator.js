class BaseDecorator {
  constructor(model) {
    this._model = model
    this._properties = model.properties()
  }

  propertiesInList() {
    return this._properties.filter(p => p.isVisible())
  }
}

module.exports = BaseDecorator
