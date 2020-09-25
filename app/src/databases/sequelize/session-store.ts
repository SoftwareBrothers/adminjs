import { Sequelize } from 'sequelize'
import session from 'express-session'

import connectSequelize from 'connect-session-sequelize'

const { SYNC } = process.env

const SequelizeStore = connectSequelize(session.Store)

export const sessionStore = (sequelize: Sequelize) => {
  const store = new SequelizeStore({
    db: sequelize,
  })

  if (SYNC) {
    store.sync()
  }

  return store
}
