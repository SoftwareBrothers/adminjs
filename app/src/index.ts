/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import dotenv from 'dotenv-json'
dotenv({ path: 'cypress.env.json' })

import AdminBro from 'admin-bro'
import AdminBroSequelize from '@admin-bro/sequelize'

import { connect, sessionStore, authenticate, createAdmin } from './databases/sequelize'
import { listen } from './plugins/express'
import { options } from './admin/options'

AdminBro.registerAdapter(AdminBroSequelize)

const run = async (): Promise<void> => {
  const sequelize = await connect()

  const admin = new AdminBro(options)

  await createAdmin()

  listen(admin, sessionStore(sequelize), authenticate)
}

run()
