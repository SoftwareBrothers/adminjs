const AbstractInstance = require('../abstract/instance')

class Instance extends AbstractInstance {
  param(name) {
    // name could have nested parameters separated by dot (.) like 'some.parameter.has' but
    // in this.params we have regular object. That is why we have to change it to params[some][parameter][has]
    const nestedParams = name.split('.')
    return nestedParams.reduce((m, param) => m[param], this.params)
  }

  id() {
    const idProperty = this.model.properties().find(p => p.isId())
    return this.param(idProperty.name())
  }
}

module.exports = Instance
