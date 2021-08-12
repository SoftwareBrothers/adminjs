/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import dotenv from 'dotenv-json'
dotenv({ path: 'cypress.env.json' })

import AdminJS from 'adminjs'
import AdminJSSequelize from '@adminjs/sequelize'

import { connect, sessionStore, authenticate, createAdmin } from './databases/sequelize'
import { listen } from './plugins/express'
import { options } from './admin/options'

AdminJS.registerAdapter(AdminJSSequelize)

const run = async (): Promise<void> => {
  const sequelize = await connect()

  const admin = new AdminJS(options)

  await createAdmin()

  admin.watch()

  listen(admin, sessionStore(sequelize), authenticate)
}

run()
