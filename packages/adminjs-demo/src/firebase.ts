import './plugins/firebase/config'

import * as functions from 'firebase-functions'
import AdminJSSequelize from '@adminjs/sequelize'
import AdminJS, { AdminJSOptions } from 'adminjs'

import { buildHandler } from '@adminjs/firebase-functions'
import * as Sentry from '@sentry/node'
import { connect, createAdmin, authenticate } from './databases/sequelize'

import { options } from './admin/options'

if (process.env.SENTRY_DNS) {
  Sentry.init({ dsn: process.env.SENTRY_DSN })
}

const firebaseOptions: AdminJSOptions = {
  ...options,
  assetsCDN: process.env.ASSETS_CDN,
  rootPath: '/',
  loginPath: '/login',
  logoutPath: '/logout',
}

AdminJS.registerAdapter(AdminJSSequelize)

const handlerOptions = {
  region: 'us-central1',
  before: async (): Promise<AdminJSOptions> => {
    await connect()
    await createAdmin()
    return firebaseOptions
  },
  auth: {
    secret: 'super-secret-string-which-encrypts-session2',
    authenticate,
  },
  customFunctionPath: 'admin',
}

const onRequestHandler = buildHandler(options, handlerOptions)

export const admin = functions.https.onRequest(async (req, res) => {
  try {
    await onRequestHandler(req, res)
  } catch (error) {
    Sentry.captureException(error)
    await Sentry.flush(10000)
    throw error
  }
})
