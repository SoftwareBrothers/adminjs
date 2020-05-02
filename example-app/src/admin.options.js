const { default: AdminBro } = require('admin-bro')
const AdminBroMongoose = require('admin-bro-mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const AdminCompany = require('./companies/company.admin')
const AdminEmployee = require('./employees/employee.admin')
const AdminProfession = require('./professions/profession.admin')

/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [AdminCompany, AdminEmployee, AdminProfession],
  version: {
    admin: true,
    app: process.env.npm_package_version,
  },
  locale: {
    language: 'en',
    translations: {
      properties: {
        'tags.addNewItem': 'Add new Tag',
        'isBig.true': 'Ja',
        'companySize.b': 'superBig',
      },
    },
  },
}

module.exports = options
