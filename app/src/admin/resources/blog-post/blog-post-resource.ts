import AdminBro, { ResourceOptions, FeatureType, PropertyOptions } from 'admin-bro'
import uploadFeature from '@admin-bro/upload'
import { ContentParent } from '../../parents'

const postMetaProperties = (scope: string): Record<string, PropertyOptions> => ({
  [scope]: {
    type: 'mixed',
  },
  [`${scope}.title`]: {
    type: 'string',
    props: {
      placeholder: 'Your title',
    },
  },
  [`${scope}.description`]: {
    type: 'textarea',
    props: {
      placeholder: 'Description text',
      minHeight: 100,
    },
  },
})

export const BlogPostResource: ResourceOptions = {
  parent: ContentParent,
  properties: {
    postImage: {
      type: 'mixed',
    },
    meta: {
      type: 'string',
      isArray: true,
    },
    tags: {
      props: {
        placeholder: 'List the tags',
      },
    },
    excerpt: {
      type: 'textarea',
      props: {
        placeholder: 'Excerpt text',
        minHeight: 100,
      },
    },
    title: {
      props: {
        borderless: true,
        variant: 'xxl',
        placeholder: 'Story Title',
      },
    },
    body: {
      type: 'richtext',
      props: {
        borderless: true,
      },
    },
    ...postMetaProperties('ogTags'),
    ...postMetaProperties('twitter'),
    ...postMetaProperties('facebook'),
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

const uploadFeatureFor = (name?: string, multiple = false) => (
  uploadFeature({
    provider: {
      gcp: {
        bucket: process.env.GOOGLE_STORAGE_MEDIA_BUCKET as string,
        expires: 0,
      },
    },
    multiple,
    properties: {
      file: `${name}.file`,
      filePath: `${name}.filePath`,
      filesToDelete: `${name}.filesToDelete`,
      key: `${name}.key`,
      mimeType: `${name}.mime`,
      bucket: `${name}.bucket`,
      size: `${name}.size`,
    },
    uploadPath: (record, filename) => (
      `${record.id()}/${name}/${filename}`
    ),
  })
)

export const BlogPostFeatures: Array<FeatureType> = [
  uploadFeatureFor('postImage'),
]
