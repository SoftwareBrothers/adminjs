import AdminBro from 'admin-bro'
import AdminBroSequelize from '@admin-bro/sequelize'
import fs from 'fs'

import { options } from '../admin/options'

AdminBro.registerAdapter(AdminBroSequelize)

export const bundle = async () => {
  const admin = new AdminBro(options)

  await fs.promises.copyFile(
    './node_modules/admin-bro/lib/frontend/assets/scripts/app-bundle.production.js',
    './public/app.bundle.js',
  )
  await fs.promises.copyFile(
    './node_modules/admin-bro/lib/frontend/assets/scripts/global-bundle.production.js',
    './public/global.bundle.js',
  )
  await fs.promises.copyFile(
    './node_modules/@admin-bro/design-system/bundle.production.js',
    './public/design-system.bundle.js',
  )

  admin.initialize().then(() => {
    fs.rename('./.adminbro/bundle.js', './public/components.bundle.js', () => {
      console.log('success')
    })
  })
}
