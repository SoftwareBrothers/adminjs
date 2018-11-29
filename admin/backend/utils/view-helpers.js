const paginate = require('jw-paginate')

class ViewHelpers {
  constructor({ admin }) {
    this._admin = admin

    this.paginate = paginate
  }

  urlBuilder(paths, query) {
    const { rootPath } = this._admin.options
    let url = `/${rootPath}/${paths.join('/')}`
    if (query) {
      const queryString = Object.keys(query).map(key => `${key}=${query[key]}`)
      url = `${url}?${queryString}`
    }
    return url
  }

  loginUrl() {
    return this.urlBuilder(['login'])
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
