let AdminBro
let constants

if (process.env.ADMIN_BRO_DEV_ENV) {
  require('@babel/polyfill')
  require('@babel/register')({
    presets: [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-typescript'),
    ],
    plugins: [require.resolve('babel-plugin-styled-components')],
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  })
  AdminBro = require('./src/admin-bro').default
  AdminBro.BaseProperty = require('./src/backend/adapters/base-property').default
  AdminBro.BaseResource = require('./src/backend/adapters/base-resource').default
  AdminBro.BaseDatabase = require('./src/backend/adapters/base-database').default
  AdminBro.BaseRecord = require('./src/backend/adapters/base-record').default
  AdminBro.Router = require('./src/backend/router').default
  AdminBro.Filter = require('./src/backend/utils/filter').default
  AdminBro.ValidationError = require('./src/backend/utils/validation-error').default
  AdminBro.ForbiddenError = require('./src/backend/utils/forbidden-error').default
  AdminBro.ACTIONS = require('./src/backend/actions/index')
  constants = require('./src/constants')
} else {
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
}

AdminBro.require = AdminBro.bundle
Object.keys(constants).forEach((key) => {
  AdminBro[key] = constants[key]
})

// This is a fix for js import statements.
AdminBro.default = AdminBro

module.exports = AdminBro
