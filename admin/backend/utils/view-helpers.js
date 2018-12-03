const paginate = require('jw-paginate')

class ViewHelpers {
  constructor({ admin }) {
    this._admin = admin
    this.paginate = paginate
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

  listUrl(database, model, query) {
    return this.urlBuilder([database.name(), model.name()], query)
  }

  newInstanceUrl(database, model) {
    return this.urlBuilder([database.name(), model.name(), 'new'])
  }

  showInstanceUrl(database, model, instance) {
    return this.urlBuilder([database.name(), model.name(), instance.id()])
  }

  editInstanceUrl(database, model, instance) {
    return this.urlBuilder([database.name(), model.name(), instance.id(), 'edit'])
  }

  deleteInstanceUrl(database, model, instance) {
    return this.urlBuilder([database.name(), model.name(), instance.id(), 'delete'])
  }
  
}

module.exports = ViewHelpers
