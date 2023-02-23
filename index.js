// eslint-disable-next-line @typescript-eslint/no-var-requires
import AdminJS from './lib/index.js'
import * as moduleExports from './lib/index.js'

Object.keys(moduleExports ?? {}).forEach((key) => {
  if (!['default', 'AdminJS'].includes(key)) {
    AdminJS[key] = moduleExports[key]
  }
})

export default AdminJS
