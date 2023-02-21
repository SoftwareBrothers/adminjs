// eslint-disable-next-line @typescript-eslint/no-var-requires
import moduleExports from './lib/index.js'

const AdminJS = moduleExports.default

Object.keys(moduleExports).forEach((key) => {
  AdminJS[key] = moduleExports[key]
})

export default AdminJS
