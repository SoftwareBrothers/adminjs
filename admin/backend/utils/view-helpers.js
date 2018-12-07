const paginate = require('jw-paginate')
const lodash = require('lodash')

class ViewHelpers {
  constructor({ admin }) {
    this._admin = admin
    this.paginate = paginate
    this._ = lodash
    this.branding = this._admin.options.branding
  }

  getObjectKeyWithValue(obj, key) {
    return typeof obj[key] === 'object' 
      ? this.getQueryPath(obj[key]) : `${key}=${obj[key]}`
  }

  getQueryPath(query) {
    const queryPath = [];
    Object.keys(query).forEach(key => {
      queryPath.push(this.getObjectKeyWithValue(query, key))
    })
    return queryPath.join('&')
  }

  urlBuilder(paths, query) {
    const { rootPath } = this._admin.options
    let url = `${rootPath}/${paths.join('/')}`
    if (query) {
      url = `${url}?${this.getQueryPath(query)}`
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

  newRecordUrl(resource) {
    return this.urlBuilder(['resources', resource.id(), 'new'])
  }

  showRecordUrl(resource, record) {
    return this.urlBuilder(['resources', resource.id(), record.id()])
  }

  customRecordActionUrl(resource, record, actionId) {
    return `${this.urlBuilder(['resources', resource.id(), record.id()])}/${actionId}`
  }

  editRecordUrl(resource, record) {
    return this.urlBuilder(['resources', resource.id(), record.id(), 'edit'])
  }

  deleteRecordUrl(resource, record) {
    return this.urlBuilder(['resources', resource.id(), record.id(), 'delete'])
  }

  isMainColumn(propertyName) {
    return ['name', 'email', 'title', '_id'].includes(propertyName)
  }
  
}

module.exports = ViewHelpers
