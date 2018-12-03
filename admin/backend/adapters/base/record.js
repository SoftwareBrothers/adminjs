const ValidationError = require('../../utils/validation-error')

const TITLE_PROPERTIES = ['name', 'title', 'topic', 'email']

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
    return nestedParams.reduce((memo, param) => memo && memo[param], this.params)
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
    const nameProperty = this.resource.properties().find(p => p.isTitle())
    return nameProperty ? this.param(nameProperty.name()) : this.id()
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
