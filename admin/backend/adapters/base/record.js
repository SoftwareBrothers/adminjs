const ValidationError = require('../../utils/validation-error')

class Record {
  constructor(params, resource) {
    this.resource = resource
    this.params = params
    this.errors = {}
  }

  param(name) {
    // name could have nested parameters separated by dot (.) like 'some.parameter.has' but
    // in this.params we have regular object. That is why we have to
    // change it to params[some][parameter][has]
    const nestedParams = name.split('.')
    return nestedParams.reduce((m, param) => m && m[param], this.params)
  }

  async update(params) {
    try {
      this.params = await this.resource.update(this.id(), params)
    } catch (e) {
      if (e instanceof ValidationError) {
        this.errors = e.errors
        return this
      }
      throw e
    }
    this.errors = {}
    return this
  }

  id() {
    const idProperty = this.resource.properties().find(p => p.isId())
    return this.param(idProperty.name())
  }

  title() {
    const nameProperty = this.resource.property('name')
                      || this.resource.property('title')
                      || this.resource.property('topic')
    if (nameProperty) {
      return this.param(nameProperty.name())
    }
    return this.id()
  }

  async save() {
    try {
      if (this.id()) {
        this.params = await this.resource.update(this.id(), this.params)
      } else {
        this.params = await this.resource.create(this.params)
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        this.errors = e.errors
        return this
      }
      throw e
    }
    this.errors = {}
    return this
  }

  isValid() {
    return Object.keys(this.errors).length === 0
  }

  error(name) {
    return this.errors[name]
  }
}

module.exports = Record
