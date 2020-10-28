import uploadFileFeature from '@admin-bro/upload'
import { FeatureType } from 'admin-bro'


export const ProductFeatures: Array<FeatureType> = [
  uploadFileFeature({
    properties: {
      file: 'photos.file',
      filePath: 'photos.path',
      filename: 'photos.filename',
      filesToDelete: 'photos.toDelete',
      key: 'photos.bucketKey',
      mimeType: 'photos.mimeType',
      bucket: 'photos.bucket',
    },
    multiple: true,
    provider: {
      gcp: {
        bucket: process.env.PRODUCTS_BUCKET as string,
        expires: 0,
      },
    },
    validation: {
      mimeTypes: ['image/jpeg', 'image/png'],
    },
  }),
]
