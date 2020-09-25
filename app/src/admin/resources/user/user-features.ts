import { FeatureType } from 'admin-bro'
import passwordFeature from '@admin-bro/passwords'

import argon2 from 'argon2'

export const UserFeatures: Array<FeatureType> = [
  passwordFeature({
    properties: {
      encryptedPassword: 'encryptedPassword',
    },
    hash: argon2.hash,
  }),
]
