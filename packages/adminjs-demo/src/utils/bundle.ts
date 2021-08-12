import AdminJS from 'adminjs'
import AdminJSSequelize from '@adminjs/sequelize'
import fs from 'fs'

import { options } from '../admin/options'

AdminJS.registerAdapter(AdminJSSequelize)

export const bundle = async () => {
  const admin = new AdminJS(options)

  await fs.promises.copyFile(
    './node_modules/adminjs/lib/frontend/assets/scripts/app-bundle.production.js',
    './public/app.bundle.js',
  )

  await fs.promises.copyFile(
    './node_modules/adminjs/lib/frontend/assets/images/logo.svg',
    './public/logo.svg',
  )

  await fs.promises.copyFile(
    './node_modules/adminjs/lib/frontend/assets/scripts/global-bundle.production.js',
    './public/global.bundle.js',
  )
  await fs.promises.copyFile(
    './node_modules/@adminjs/design-system/bundle.production.js',
    './public/design-system.bundle.js',
  )

  admin.initialize().then(() => {
    fs.rename('./.adminjs/bundle.js', './public/components.bundle.js', () => {
      console.log('success')
    })
  })
}
