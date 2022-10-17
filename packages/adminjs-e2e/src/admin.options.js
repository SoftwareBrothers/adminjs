const { default: AdminJS } = require('adminjs')
const ComponentLoader = require('adminjs/utils/component-loader')
const AdminJSMongoose = require('@adminjs/mongoose')
const AdminJSSequelize = require('@adminjs/sequelize')

AdminJS.registerAdapter(AdminJSMongoose)
AdminJS.registerAdapter(AdminJSSequelize)

const AdminCompany = require('./companies/company.admin')
const AdminEmployee = require('./employees/employee.admin')
const AdminExternalEmployee = require('./external-employees/external-employee.admin')
const AdminTaggable = require('./taggables/taggable.admin')
const AdminProfession = require('./professions/profession.admin')
const AdminTool = require('./tools/tool.admin')
const AdminPage = require('./pages/page.admin')
const AdminNested = require('./nested/nested.admin')

const loader = new ComponentLoader()
const Components = {
  ExamplePage: loader.add('ExamplePage', './components/example-page'),
}
loader.bundleAll()

/** @type {import('adminjs').AdminJSOptions} */
const options = {
  resources: [
    AdminCompany,
    AdminEmployee,
    AdminProfession,
    AdminExternalEmployee,
    AdminTool,
    AdminTaggable,
    AdminPage,
    AdminNested,
  ],
  version: {
    admin: true,
    app: process.env.npm_package_version,
  },
  branding: currentUser => ({
    companyName: currentUser ? currentUser.email : 'something',
  }),
  pages: {
    aboutUs: {
      handler: async () => { console.log('clicked') },
      component: Components.ExamplePage,
      icon: 'Add',
    },
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
