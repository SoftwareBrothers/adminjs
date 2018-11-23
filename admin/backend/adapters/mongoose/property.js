const AbstractProperty = require('../abstract/property')

class Property extends AbstractProperty {
  constructor(name, mongoosePath) {
    super()
    this.name = name
    this.path = mongoosePath
  }
}

module.exports = Property
