import AdminBro, { ResourceOptions, FeatureType } from 'admin-bro'
import uploadFeature from '@admin-bro/upload'
import { ContentParent } from '../../parents'

export const BlogPostResource: ResourceOptions = {
  parent: ContentParent,
  properties: {
    meta: {
      type: 'string',
      isArray: true,
    },
    title: {
      custom: {
        borderless: true,
        variant: 'xxl',
        placeholder: 'Story Title',
      },
    },
    body: {
      type: 'richtext',
      custom: {
        borderless: true,
      },
    },
  },
  actions: {
    edit: {
      component: AdminBro.bundle(
        '../../../../../src/admin/resources/blog-post/components/blog-action.component.tsx',
      ),
      hideActionHeader: true,
    },
    show: {
      isAccessible: false,
    },
  },
}

export const BlogPostFeatures: Array<FeatureType> = [uploadFeature({
  provider: {
    gcp: {
      bucket: process.env.GOOGLE_STORAGE_MEDIA_BUCKET as string,
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
