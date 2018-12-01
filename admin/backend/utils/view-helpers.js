const paginate = require('jw-paginate')

class ViewHelpers {
  constructor({ admin }) {
    this._admin = admin

    this.paginate = paginate
    this.branding = this._admin.options.branding
  }

  urlBuilder(paths, query) {
    const { rootPath } = this._admin.options
    let url = `${rootPath}/${paths.join('/')}`
    if (query) {
      const queryString = Object.keys(query).map(key => `${key}=${query[key]}`)
      url = `${url}?${queryString}`
    }
    return url
  }

  loginUrl() {
    return this._admin.options.loginPath
  }

  logoutUrl() {
    return this._admin.options.logoutPath
  }

  dashboardUrl() {
    return this._admin.options.rootPath
  }

  listUrl(model, query) {
    return this.urlBuilder(['models', model.id()], query)
  }

  newInstanceUrl(model) {
    return this.urlBuilder(['models', model.id(), 'new'])
  }

  showInstanceUrl(model, instance) {
    return this.urlBuilder(['models', model.id(), instance.id()])
  }

  editInstanceUrl(model, instance) {
    return this.urlBuilder(['models', model.id(), instance.id(), 'edit'])
  }

  deleteInstanceUrl(model, instance) {
    return this.urlBuilder(['models', model.id(), instance.id(), 'delete'])
  }
}

module.exports = ViewHelpers
