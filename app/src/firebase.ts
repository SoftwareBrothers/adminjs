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
}

AdminBro.registerAdapter(AdminBroSequelize)

const onRequestHandler = buildHandler(options, {
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
})

export const admin = functions.https.onRequest(onRequestHandler)
