import { ResourceOptions, FeatureType, PropertyOptions } from 'admin-bro'
import blogFeature from '@softwarebrothers/admin-bro-blog'
import { ContentParent } from '../../parents'


export const BlogPostResource: ResourceOptions = {
  parent: ContentParent,
  properties: {
    postImage: {
      type: 'mixed',
    },
    inlineImages: {
      type: 'mixed',
    },
  },
  actions: {
  },
}

export const BlogPostFeatures: Array<FeatureType> = [
  blogFeature({
    properties: {
      title: 'title',
      body: 'body',
      status: 'status',
      postUrl: 'postUrl',
      excerpt: 'excerpt',
      ogTags: 'ogTags',
      postImage: 'postImage',
      inlineImages: 'inlineImages',
      twitterMeta: 'twitter',
      facebookMeta: 'facebook',
    },
    uploadProvider: {
      gcp: {
        bucket: process.env.BLOG_BUCKET as string,
        expires: 0,
      },
    },
    tags: {
      property: 'tags',
      resourceId: 'Tags',
      nameColumn: 'name',
    },
  }),
]
