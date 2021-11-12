import { FeatureType } from 'adminjs'
import passwordFeature from '@adminjs/passwords'
import uploadFeature from '@adminjs/upload'

import argon2 from 'argon2'

export const UserFeatures: Array<FeatureType> = [
  passwordFeature({
    properties: {
      encryptedPassword: 'encryptedPassword',
    },
    hash: argon2.hash,
  }),
  uploadFeature({
    properties: {
      key: 'profilePhoto.bucketKey',
      mimeType: 'profilePhoto.mimeType',
      bucket: 'profilePhoto.bucket',
    },
    provider: {
      gcp: {
        bucket: process.env.USERS_BUCKET as string,
        expires: 0,
      },
    },
    validation: {
      mimeTypes: ['image/jpeg', 'image/png'],
    },
  }),
]
