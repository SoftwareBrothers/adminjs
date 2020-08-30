let AdminBro
let constants

AdminBro = require('./lib/admin-bro').default
AdminBro.BaseProperty = require('./lib/backend/adapters/base-property').default
AdminBro.BaseResource = require('./lib/backend/adapters/base-resource').default
AdminBro.BaseDatabase = require('./lib/backend/adapters/base-database').default
AdminBro.BaseRecord = require('./lib/backend/adapters/base-record').default
AdminBro.Router = require('./lib/backend/router').default
AdminBro.Filter = require('./lib/backend/utils/filter').default
AdminBro.ValidationError = require('./lib/backend/utils/validation-error').default
AdminBro.ForbiddenError = require('./lib/backend/utils/forbidden-error').default
AdminBro.ACTIONS = require('./lib/backend/actions/index')
constants = require('./lib/constants')

const { buildFeature, mergeResourceOptions } = require('./lib/backend/utils/build-feature')

AdminBro.buildFeature = buildFeature
AdminBro.mergeResourceOptions = mergeResourceOptions
AdminBro.flatten = require('./lib/admin-bro').flatten
AdminBro.unflatten = require('./lib/admin-bro').unflatten

AdminBro.require = AdminBro.bundle
Object.keys(constants).forEach((key) => {
  AdminBro[key] = constants[key]
})

// This is a fix for js import statements.
AdminBro.default = AdminBro

module.exports = AdminBro
