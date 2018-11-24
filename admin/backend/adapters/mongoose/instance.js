const AbstractInstance = require('../abstract/instance')

class Instance extends AbstractInstance {
  param(name) {
    return this.params[name]
  }

  id() {
    const idProperty = this.model.properties().find(p => p.isId())
    return this.param(idProperty.name())
  }
}

module.exports = Instance
