import './plugins/firebase'

import * as functions from 'firebase-functions'
import AdminBroSequelize from '@admin-bro/sequelize'
import AdminBro, { AdminBroOptions } from 'admin-bro'

import { buildHandler } from '@admin-bro/firebase-functions'
import { connect, createAdmin, authenticate } from './databases/sequelize'

import { options } from './admin/options'

const firebaseOptions: AdminBroOptions = {
  ...options,
  assetsCDN: process.env.ASSETS_CDN,
  rootPath: '/',
  loginPath: '/login',
  logoutPath: '/logout',
}

AdminBro.registerAdapter(AdminBroSequelize)

const handlerOptions = {
  region: 'us-central1',
  before: async () => {
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

export const admin = functions.https.onRequest(onRequestHandler)
