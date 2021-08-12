// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleExports = require('./lib')

const AdminJS = moduleExports.default

Object.keys(moduleExports).forEach((key) => {
  if (key === '__esModule') return
  AdminJS[key] = moduleExports[key]
})

module.exports = AdminJS
