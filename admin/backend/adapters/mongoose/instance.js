const _ = require('lodash')

const BaseInstance = require('../base/instance')
const ValidationError = require('../../utils/validation-error')

class Instance extends BaseInstance {
  static flattenParams(paramObject, key) {
    return Object.keys(paramObject).reduce((m, nestedKey) => {
      const k = key ? `${key}.${nestedKey}` : nestedKey
      if (paramObject[nestedKey] instanceof Object) {
        const p = Instance.flattenParams(paramObject[nestedKey], k)
        return Object.assign(m, p)
      }
      m[k] = paramObject[nestedKey]
      return m
    }, {})
  }

  static unflattenParams(paramObject) {
    return Object.keys(paramObject).reduce((m, key) => {
      _.set(m, key, paramObject[key])
      return m
    }, {})
  }

  constructor(params, model) {
    super()
    this.model = model
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
      this.params = await this.model.update(this.id(), params)
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
    const idProperty = this.model.properties().find(p => p.isId())
    return this.param(idProperty.name())
  }

  async save() {
    try {
      if (this.id()) {
        this.params = await this.model.update(this.id(), this.params)
      } else {
        this.params = await this.model.create(this.params)
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

module.exports = Instance
