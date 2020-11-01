// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleExports = require('./lib')

const AdminBro = moduleExports.default

Object.keys(moduleExports).forEach((key) => {
  if (key === '__esModule') return
  AdminBro[key] = moduleExports[key]
})

module.exports = AdminBro
