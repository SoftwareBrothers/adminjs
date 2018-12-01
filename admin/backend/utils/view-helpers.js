const paginate = require('jw-paginate')
const lodash = require('lodash')

class ViewHelpers {
  constructor({ admin }) {
    this._admin = admin

    this.paginate = paginate
    this._ = lodash
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

  listUrl(resource, query) {
    return this.urlBuilder(['resources', resource.id()], query)
  }

  newInstanceUrl(resource) {
    return this.urlBuilder(['resources', resource.id(), 'new'])
  }

  showInstanceUrl(resource, instance) {
    return this.urlBuilder(['resources', resource.id(), instance.id()])
  }

  editInstanceUrl(resource, instance) {
    return this.urlBuilder(['resources', resource.id(), instance.id(), 'edit'])
  }

  deleteInstanceUrl(resource, instance) {
    return this.urlBuilder(['resources', resource.id(), instance.id(), 'delete'])
  }
}

module.exports = ViewHelpers
