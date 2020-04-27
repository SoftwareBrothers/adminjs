const { default: AdminBro } = require('admin-bro')
const AdminBroMongoose = require('admin-bro-mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const AdminCompany = require('./companies/company.admin')

/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [AdminCompany],
  version: {
    admin: true
  }
}

module.exports = options
