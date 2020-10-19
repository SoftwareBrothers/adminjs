import { ResourceOptions, FeatureType, PropertyOptions } from 'admin-bro'
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
  },
}

const uploadFeatureFor = (name?: string, multiple = false) => (
  uploadFeature({
    provider: {
      gcp: {
        bucket: process.env.MEDIA_BUCKET as string,
        expires: 0,
      },
    },
    multiple,
    properties: {
      file: name ? `${name}.file` : 'blogImageFiles',
      filePath: name ? `${name}.filePath` : 'blogImagePaths',
      filesToDelete: name ? `${name}.filesToDelete` : 'blogImagesToDelete',
      key: name ? `${name}.key` : 'blogImageKeys',
      mimeType: name ? `${name}.mime` : 'blogImageMimeTypes',
      bucket: name ? `${name}.bucket` : 'blogImageBuckets',
      size: name ? `${name}.size` : 'blogImageSizes',
    },
    uploadPath: (record, filename) => (
      name ? `${record.id()}/${name}/${filename}` : `${record.id()}/blog-images/${filename}`
    ),
  })
)

export const BlogPostFeatures: Array<FeatureType> = [
  uploadFeatureFor('postImage'),
  uploadFeatureFor(undefined, true),
]
