class BaseDecorator {
  constructor(model) {
    this._model = model
    this._properties = model.properties()
  }

  
}


module.exports = BaseDecorator
