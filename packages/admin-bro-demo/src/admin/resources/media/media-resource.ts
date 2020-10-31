import AdminBro, { FeatureType, ResourceOptions } from 'admin-bro'
import uploadFeature from '@admin-bro/upload'

import { ContentParent } from '../../parents'

const hideInEdit = { list: true, show: true, filter: true }

export const MediaResource: ResourceOptions = {
  parent: ContentParent,
  listProperties: ['uploadedFile', 'description', 'size', 'createdAt'],
  properties: {
    key: { isVisible: { list: true, show: true } },
    filename: { isVisible: hideInEdit },
    mimetype: { isVisible: hideInEdit },
    size: { isVisible: hideInEdit },
    bucket: { isVisible: hideInEdit },
  },
  actions: {
    show: { isAccessible: false },
    edit: {
      showInDrawer: true,
    },
    new: {
      showInDrawer: true,
    },
  },
}

export const MediaFeatures: Array<FeatureType> = [uploadFeature({
  provider: {
    gcp: {
      bucket: process.env.MEDIA_BUCKET as string,
    },
  },
  properties: {
    key: 'key',
    bucket: 'bucket',
    mimeType: 'mimetype',
    size: 'size',
    filename: 'filename',
    file: 'uploadedFile',
  },
})]
